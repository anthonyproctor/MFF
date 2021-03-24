export default function() {
	$('.faq-toggles .section').each(function(){
		let $that = $(this);

		$(this).find('h3').on('click', function(event){
			event.preventDefault();

			$('.faq-toggles .section p').slideUp();
			$('.faq-toggles .section').removeClass('open');

			if($that.find('p').is(':visible')) {
				$that.removeClass('open');
			} else {
				$that.addClass('open');
				$that.find('p').slideDown();
			}
		})
	})

	$('.faq-container .faq-category').each(function(){
		let $category = $(this);
		$(this).find('.faq-block').each(function(){
			let $block = $(this);

			$block.find('.title-toggle').on('click', function(event){
				event.preventDefault();

				if($block.find('.faq-answer').is(':visible')){
					$block.find('.faq-answer').slideUp();
					$block.find('.toggle-icon').html('+');
				} else {
					$category.find('.faq-answer').slideUp();
					$category.find('.toggle-icon').html('+');
					$block.find('.faq-answer').slideDown();
					$block.find('.toggle-icon').html('-');
				}
			})
		})
	})
}
