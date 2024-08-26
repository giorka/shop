from django.db import models


class User(models.Model):
    id = models.CharField()


class Product(models.Model):
    name = models.TextField()
    price = models.FloatField()


class Cart(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    full_price = models.PositiveIntegerField()


class CartItem(models.Model):
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    cart = models.ForeignKey(to=Cart, on_delete=models.CASCADE, related_name="cart_items")
    quantity = models.PositiveIntegerField()


class Order(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    full_price = models.PositiveIntegerField()


class OrderItem(models.Model):
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    order = models.ForeignKey(to=Order, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.PositiveIntegerField()
    price = models.FloatField()


def create_order(request):
    cart: Cart = Cart.objects.filter(user=request.user).first()

    ...

    order = Order.objects.create(user=request.user, full_price=0)
    full_price = 0

    for cart_item in cart_items := cart.cart_items.all():
        order_item = OrderItem.objects.create(order=order, product=cart_item.product, quantity=cart_item.quantity, price=cart_item.price)

        full_price += order_item.price * order_item.quantity

    order.full_price = full_price
    order.save()

    # убить все товары
