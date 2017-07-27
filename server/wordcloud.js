import {Meteor} from "meteor/meteor";
import {Cardsets} from "../imports/api/cardsets.js";
import {Cloud} from "../imports/api/cloud.js";

Meteor.methods({
	updateWordsForWordcloud: function () {
		if (!Meteor.isServer) {
			throw new Meteor.Error("not-authorized");
		} else {
			var cardsets = Cardsets.find({}, {fields: {_id: 1, name: 1, quantity: 1, kind: 1}});

			var list = [];

			// find biggest cardset for normalization
			var biggestCardsetSize = 0;
			cardsets.forEach(function (cardset) {
				if (cardset.quantity > biggestCardsetSize) {
					biggestCardsetSize = cardset.quantity;
				}
			});

			// load cardset name
			cardsets.forEach(function (cardset) {
				var name = cardset.name;

				if (name.length > 30) {
					name = name.substring(0, 30) + "…";
				}

				var colors = ["#003bd1", "#80ba24", "#ffb300"];

				var color = colors[0];
				switch (cardset.kind) {
					case "free":
						color = colors[0];
						break;
					case "edu":
						color = colors[1];
						break;
					case "pro":
						color = colors[2];
						break;
				}

				var quantitiy = cardset.quantity / biggestCardsetSize * 40;

				list.push([name, quantitiy, color]);
			});

			// sort list
			list.sort(function (a, b) { return (b[0].length * b[1]) - (a[0].length * a[1]); });

			if (list.length > 0) {
				Cloud.remove({});
				Cloud.insert({'list': list});
			}
		}
	}
});
