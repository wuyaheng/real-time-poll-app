const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
    const choice = document.querySelector('input[name=pl]:checked').value;
    const data = {pl: choice};

    fetch('/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));

    e.preventDefault();
})


fetch('/poll').then(res => res.json()).then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.pl] = (acc[vote.pl] || 0) + parseInt(vote.points)), acc), {});

    let dataPoints = [
        { label: 'Java', y: voteCounts.Java },
        { label: 'Python', y: voteCounts.Python },
        { label: 'JavaScript', y: voteCounts.JavaScript },
        { label: 'Other', y: voteCounts.Other }
    ];
    
    const chartContainer = document.querySelector('#chartContainer');
    
    CanvasJS.addColorSet("colors",
    [
    "#c9e4de",
    "#f7d9c4",
    "#f9c6c9",
    "#c6def1"
    ]);
    
    if(chartContainer) {
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            colorSet: "colors",
            title: {
                text: `Total Votes ${totalVotes}`
            },
            data: [
              {
                  type: 'column',
                  dataPoints: dataPoints
              }  
            ]
        });
        chart.render();
    
    
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('4d663d463bfd69bb5f70', {
          cluster: 'us2'
        });
    
        var channel = pusher.subscribe('pl-poll');
        channel.bind('pl-vote', function(data) {
          dataPoints = dataPoints.map(x => {
              if(x.label == data.pl) {
                  x.y += data.points;
                  return x;
              } else {
                  return x;
              }
          });
          chart.render();
        });
    }
    



});


