# Generated by Django 5.0.4 on 2024-05-18 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0003_order_items_list_alter_order_delivery_time'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='items_list',
            new_name='prodotti',
        ),
        migrations.AlterField(
            model_name='order',
            name='delivery_time',
            field=models.IntegerField(default=21),
        ),
    ]
