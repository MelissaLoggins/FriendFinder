var friendData = require('../data/friends.js');

module.exports = function (app) {

	app.get('/api/friends', function (req, res) {
		res.json(friendData);
	});

	app.post("/api/friends", function(req, res) {

		var newUser = req.body;
		console.log(newUser);
	
		friendData.push(newUser);

		var scoreDifference = 0;
		var totalDifference = [];

		for (var i = 0; i < (friendData.length - 1); i++){
			for (var j = 0; j < friendData[i].scores.length; j++){
				scoreDifference += Math.abs(friendData[i].scores[j] - newUser.scores[j]);
			}

			totalDifference.push(scoreDifference);
			scoreDifference = 0;
		}

			var friendResult = friendData[totalDifference.indexOf(Math.min.apply(null, totalDifference))];
			res.send(friendResult);
		});
	}
