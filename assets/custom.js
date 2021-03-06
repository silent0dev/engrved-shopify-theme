/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

$(document).ready(function(){
    $('.HorizontalList__Item').each(function(){
        if ($(this).find('input').prop('checked')) {
            metalColor = $(this).find('label').text().trim().toLowerCase();
        }
    });

    $('.ColorSwatch').click(function(){
        metalColor = $(this).text().trim().toLowerCase();
    });

    $(".gf_swatches-selector[data-name=Color]").find('.gf_swatch').each(function(){
        if ($(this).hasClass('gf_selected')) {
            metalColor = $(this).data('value').trim().toLowerCase();
        }
    });

    $(".gf_swatches-selector[data-name=Color]").find('.gf_swatch').mouseup(function(){
        metalColor = $(this).data('value').trim().toLowerCase();
    });
});