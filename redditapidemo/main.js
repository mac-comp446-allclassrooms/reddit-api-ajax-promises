 //jquery on method for the submit event and function
 //responsible for the little loading visualization before data is loaded
 //appends the class and creates div element
 $(".search").on("submit", function(e){
   e.preventDefault();
  let loader = document.createDocumentFragment();
  let loading = document.createElement('div');
  $(loading).addClass('loader');
  $(loading).html('Loading...')
  loader.append(loading)
  $('#results').html(loader)

  //grabbing user input from the field and its value to store in q
  let q = $('input[name="search"]').val();
    
  //creating a promise object using an ajax request to reddit API from user input q
    let promise = $.ajax({
      type: 'GET',
      url: 'https://www.reddit.com/r/' + q + '.json'
    })

    //Promise.then() takes two arguments, 
    //a callback for success and another for failure.
    promise.then(function(data) {
      let fragment = document.createDocumentFragment();

      //from reddit api subreddit based on user input
      //it will create DOM methods to create html elements
      //such as author, link to post url, title, and score or rating
      data.data.children.forEach(function(post) {
        //the line above is using a for each loop to loop through the set of posts
        //and grabbing data and its children
        let row = document.createElement('div');
        $(row).addClass('row');
        let link = document.createElement('a');
        link.href = post.data.url;
        link.target = '_blank'
        row.append(link);
        let title = document.createElement('h1');
        title.innerHTML = post.data.title;
        link.append(title);
        let score = document.createElement('div');
        $(score).addClass('score');
        score.innerHTML = post.data.score;
        row.append(score);
        let author = document.createElement('div');
        $(author).addClass('author');
        author.innerHTML = post.data.author;
        row.append(author);
        fragment.append(row);
      })

      $('#results').html(fragment)
    // below is the error when promise is not fullfilled
    }, function() {
	  $('#results').html('That subreddit does not exist')
});
});
