// Run in background script
var json = { 
	"store": 
	{
		"book": [
			{ 
				"category": "reference",
				"author": "Nigel Rees",
				"title": "Sayings of the Century",
				"price": 8.95
			},
			{ 
				"category": "fiction",
				"author": "Evelyn Waugh",
				"title": "Sword of Honour",
				"price": 12.99
			},
			{ 
				"category": "fiction",
				"author": "Herman Melville",
				"title": "Moby Dick",
				"isbn": "0-553-21311-3",
				"price": 8.99
			},
			{ 
				"category": "fiction",
				"author": "J. R. R. Tolkien",
				"title": "The Lord of the Rings",
				"isbn": "0-395-19395-8",
				"price": 22.99
			}
		],
		"bicycle": {
			"color": "red",
			"price": 19.95
		}
	}
};

var path1 = 'store.book[0].author'; // The author of the first book
var path2 = 'store.book[*].author'; // All authors
var path3 = 'store..price'; // All prices
var path4 = '$..book[?(@.price<10)]'; // All books cheaper than 10
var path5 = '$..book[?(@.isbn)]'; // All books with an ISBN number
var path6 = '$..*'; // All members of JSON structure

var gjp = new GlideJsonPath(JSON.stringify(json));
gs.info('Path: ' + path1 + ' Result: ' + gjp.read(path1));
gs.info('Path: ' + path2 + ' Result: ' + gjp.read(path2));
gs.info('Path: ' + path3 + ' Result: ' + gjp.read(path3));
gs.info('Path: ' + path4 + ' Result: ' + gjp.read(path4));
gs.info('Path: ' + path5 + ' Result: ' + gjp.read(path5));
gs.info('Path: ' + path6 + ' Result: ' + gjp.read(path6));