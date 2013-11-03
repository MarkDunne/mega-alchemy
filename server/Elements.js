Elements.remove({})

if(Elements.find({}).count() == 0){
	Elements.insert({name: 'fire', parents: []});
	Elements.insert({name: 'earth', parents: []});
	Elements.insert({name: 'water', parents: []});
}

// Elements.allow({
// 	insert: function(name, parents){
// 		return true;
// 	}
// });

// Elements.deny({
// 	insert: function(element){
// 		console.log(element)
// 		parents = parents.sort();
// 		Elements.find({}).forEach(function(element){
// 			if (_.isEqual(parents, element.parents)) {
// 				return true;
// 			};
// 		});
// 	}
// });