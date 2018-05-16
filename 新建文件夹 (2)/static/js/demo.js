/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#bcc3c4',
    lineColor: '#bcc3c4'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});