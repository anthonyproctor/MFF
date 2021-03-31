import axios from 'axios';
import swal from '../global/sweet-alert';

export default function() {
	function updateInterface(response, product) {
		$('.navUser-item-cartLabel svg').animate({left: '5px'}, "fast");
		$('.navUser-item-cartLabel svg').animate({left: '-5px'}, "fast");
		$('.navUser-item-cartLabel svg').animate({left: '5px'}, "fast");
		$('.navUser-item-cartLabel svg').animate({left: '-5px'}, "fast");
		$('.navUser-item-cartLabel svg').animate({left: '0'}, "fast");

		let $cartQuantity = 0; 
		$.each(response.data.lineItems.physicalItems, function(idx, item){
			$cartQuantity = $cartQuantity + item.quantity;
		});
		$('.countPill.cart-quantity').html($cartQuantity);

		product.find('.added-to-cart-icon').fadeIn();
		product.find('.card-body .ob-btn').html('In Your Cart!');
		setTimeout(function(){ 
			product.find('.added-to-cart-icon').fadeOut();
			product.find('.card-body .ob-btn').html('Add to Cart'); 
		}, 3000);
	}

	function checkCartResponse(existingCart, line_items, product) {
	    if(existingCart.data.length > 0) {
		    // If cart already exists, update cart
		    let cartId = existingCart.data[0].id;

		    axios.post(`/api/storefront/carts/${cartId}/items`, { line_items })
		    .then((response) => {
		    	updateInterface(response, product);
		    }, (error) => {
		      swal.fire({
		        text: error.response.data.detail,
		        icon: 'error'
		      });
		      product.find('.card-body .ob-btn').html('Add to Cart');
		    });
		} else {
		    // Otherwise, create new cart and add items to it
		    axios.post(`/api/storefront/carts`, { line_items })
		    .then((response) => {
		    	updateInterface(response, product);
		    }, (error) => {
		      swal.fire({
		        text: error.response.data.detail,
		        icon: 'error'
		      });
		      product.find('.card-body .ob-btn').html('Add to Cart');
		    });
		}
	}

	$('li.product').each(function(){
		let $productId = parseInt($(this).find('.card').attr('data-entity-id'));
		let line_items = [];

		let $that = $(this);

		$(this).find('.ob-btn').on('click touch', function(e){
			e.preventDefault();
			$(e.currentTarget).html('Adding...');

			line_items.push({
		        quantity: 1,
		        productId: $productId
		    })

			let existingCart = axios.get('/api/storefront/carts')
			.then((response) => {
			    checkCartResponse(response, line_items, $that);
			}, (error) => {
			    swal.fire({
			      text: error.response.data.detail,
			      icon: 'error'
			    });
			    $(e.currentTarget).html('Add to Cart');
			});
		})
	})
}