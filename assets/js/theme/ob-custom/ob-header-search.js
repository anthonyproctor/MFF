export default function() {
	const $headerSearchBox = $('.navPages-quickSearch');
	const $headerSearchBtn = $('.ob-search-toggle');
	const $headerSearchClose = $('.navPages-quickSearch .exit');
	let vw = $(document).width();

  	if (vw > 801) {
		$headerSearchBtn.on('click', function(event){
			$headerSearchBox.toggle('slide');
		});
		$headerSearchClose.on('click', function(event){
			$headerSearchBox.toggle('slide');
		});
	}
}
