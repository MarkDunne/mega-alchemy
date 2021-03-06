Elements = new Meteor.Collection("elements");

element_exists = function(element_parents){
	return Elements.find({parents: element_parents.sort()}).count() > 0;
}

Elements.deny({
	insert: function(user_id, new_element){
		return element_exists(new_element.parents);
	},
});
