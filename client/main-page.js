new_element = function(parents){
	console.log(parents);
}

Template.elements.element = function(){
	return Elements.find({});
}

Template.elements.rendered = function () {

	var latest_clone; 

	$('.element').draggable({
		helper: 'clone',
	});

	$('#combine_area').droppable({
		drop: function(event, ui){
			console.log('parent drop');
			clone = ui.draggable
			if(!clone.hasClass('cloned')){
				clone = clone.clone();
				clone.addClass('cloned');
				clone.offset(ui.helper.position());
				clone.appendTo($(this));
				latest_clone = clone;
			}

			clone.draggable({});
			clone.droppable({
				greedy:true,
				drop: function(event, ui){
					console.log('clone drop');

					if(ui.draggable.hasClass('cloned')){
						ui.draggable.remove();
					}else{
						latest_clone.remove();
					}
					$(this).remove();

					new_element([
						$(this).data('element-id'), 
						ui.draggable.data('element-id')
					]);
				}
			});
		}
	});
}

// {
// 		greedy: true,
// 		accept: '.element',
// 		over: function(event, ui){
// 			$(ui.helper).css('z-index', zCounter++);
// 		},
// 		drop: function(event, ui){
// 			event.stopPropagation();
// 			dropped_element = $(ui.helper)
// 			if(!dropped_element.hasClass('cloned')){
// 				dropped_element = dropped_element.clone();
// 				dropped_element.addClass('cloned');
// 			}
// 			console.log(event);
// 			dropped_element.draggable();
// 			dropped_element.droppable({
// 				greedy: true,
// 				accept: '.element',
// 				over: function(event, ui){
// 					$(ui.helper).css('z-index', zCounter++);
// 				},
// 				drop: function(event, ui){
// 					id1 = $(this).data("element-id");
// 					id2 = $(ui.draggable).data("element-id");

// 					if(ui.draggable.hasClass('cloned')){
// 						ui.draggable.remove();
// 					}
// 					$(this).remove();

// 					console.log(event);
// 				}
// 			});
// 			dropped_element.appendTo($(this));
// 		}
// 	}