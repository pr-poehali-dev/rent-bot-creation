import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """
    Принимает заявку с сайта и отправляет на realty22@mail.ru.
    Поддерживает два типа форм: основная заявка и консультация для крупных автопарков.
    """
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    name = str(body.get('name', '')).strip()[:200]
    contact = str(body.get('contact', body.get('phone', ''))).strip()[:200]
    message = str(body.get('message', '')).strip()[:2000]
    cars = str(body.get('cars', '')).strip()[:50]
    form_type = str(body.get('type', 'lead')).strip()[:30]

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'name and contact required'}),
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    smtp_user = 'realty22@mail.ru'
    to_email = 'realty22@mail.ru'

    subject_map = {
        'lead': 'Новая заявка с сайта RentCarBot',
        'consultation': 'Консультация для автопарка (10+ машин)',
    }
    subject = subject_map.get(form_type, 'Новая заявка с сайта RentCarBot')

    html_body = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #2E7D32;">{subject}</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; background: #f3f4f6;"><b>Имя</b></td><td style="padding: 8px;">{name}</td></tr>
        <tr><td style="padding: 8px; background: #f3f4f6;"><b>Контакт</b></td><td style="padding: 8px;">{contact}</td></tr>
        {f'<tr><td style="padding: 8px; background: #f3f4f6;"><b>Кол-во машин</b></td><td style="padding: 8px;">{cars}</td></tr>' if cars else ''}
        {f'<tr><td style="padding: 8px; background: #f3f4f6;"><b>Сообщение</b></td><td style="padding: 8px;">{message}</td></tr>' if message else ''}
      </table>
      <p style="margin-top: 24px; color: #777; font-size: 12px;">Письмо отправлено автоматически с сайта RentCarBot</p>
    </body></html>
    """

    if not smtp_password:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'SMTP not configured'}),
        }

    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = to_email
        msg['Reply-To'] = contact if '@' in contact else smtp_user
        msg.attach(MIMEText(html_body, 'html', 'utf-8'))

        with smtplib.SMTP_SSL('smtp.mail.ru', 465, timeout=15) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, [to_email], msg.as_string())
    except Exception as e:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Email send failed', 'detail': str(e)[:200]}),
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}),
    }
