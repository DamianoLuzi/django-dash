# Generated by Django 5.0.4 on 2024-05-17 20:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_remove_customer_phone_remove_restaurant_phone_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='restaurant',
            old_name='position',
            new_name='indirizzo',
        ),
    ]
