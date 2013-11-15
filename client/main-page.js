Meteor.subscribe("elements");

Meteor.startup(function(){

	$.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
      $('#icon_creator #colors').append("<a href='#icon_canvas' data-color='" + this + "' style='display:inline-block; background: " + this + ";'></a> ");
    });

    $.each([10, 20, 30, 50], function() {
      $('#icon_creator #sizes').append("<a href='#icon_canvas' class='btn' data-size='"+this+"'>"+this+"</a>");
    });

    canvas = $('#icon_canvas');
    canvas.sketch();

    $('#create_element').click(function(){
    	element_name = $('#element_name').val();
    	element_parents = $(this).data('parents');
    	element_image = $('#icon_canvas')[0].toDataURL();
    	Meteor.call("addElement", {name: element_name, parents: element_parents, image: element_image});
    	
    	dismiss_new_element_dialog();
    });

    $('#element_info_wrapper').click(function(evt){
    	if(evt.target == this)
    		$('#element_info_wrapper').removeClass('active');
    });

    $('#new_element_dialog_wrapper').click(function(evt){
    	if(evt.target == this)
    		dismiss_new_element_dialog();
    });
});

dismiss_new_element_dialog = function(){
	$('#icon_canvas').sketch().clear();
	$('#element_name').val("");
	$('#new_element_dialog_wrapper').removeClass('active');
}

new_element = function(parents){
	parents = parents.sort();
	if(!element_exists(parents)){
		$('#create_element').data('parents', parents);
		$('#new_element_dialog_wrapper').addClass('active');
	}else{
		element = Elements.find({parents:parents}).fetch()[0];
		$.pnotify({
		    title: 'Eelement already exists!',
		    text: 'This element already exists as ' + element.name,
		    type: 'error'
		});
	}
}

Template.elements.element = function(){
	return Elements.find({}, {sort: [["when", "desc"]]});
}

Template.elements.rendered = function () {

	var latest_clone; 

	$('#elements .element').click(function(){
		$('#element_info_wrapper').addClass('active');
		element = Elements.find({_id: $(this).data('element-id')}).fetch()[0];
		$('#element_info_wrapper #child p').text(element.name);
		$('#element_info_wrapper #child img').attr("src", element.image);

		parent1 = Elements.find({_id: element.parents[0]}).fetch()[0];
		if(parent1){
			$('#element_info_wrapper #parent1 p').text(parent1.name);
			$('#element_info_wrapper #parent1 img').attr("src", parent1.image);			
		}else{
			$('#element_info_wrapper #parent1 p').text("");
			$('#element_info_wrapper #parent1 img').attr("src", "");	
		}
		parent2 = Elements.find({_id: element.parents[1]}).fetch()[0];
		if(parent2){
			$('#element_info_wrapper #parent2 p').text(parent2.name);
			$('#element_info_wrapper #parent2 img').attr("src", parent2.image);
		}else{
			$('#element_info_wrapper #parent2 p').text("");
			$('#element_info_wrapper #parent2 img').attr("src", "");
		}
	});

	$('.element').draggable({
		helper: 'clone',
		cursor: 'move',
	});

	$('#combine_area').droppable({
		drop: function(event, ui){
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