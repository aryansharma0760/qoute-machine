const API = 
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  state = {
    quotes : [
      {
       "quote":"Whatever the mind of man can conceive and believe, it can achieve.","author":"Napoleon Hill"}],
    index : 0
  }
  componentDidMount(){
    fetch(API).then(res => res.json()).then(res => {
      this.setState({
        quotes : res.quotes
      }, this.getRandomIndex);
    });
  }
  getRandomIndex = () => {
    const {quotes} = this.state;
    if(quotes.length > 0){
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }
  }
  
 
   render(){
    const {quotes, index} = this.state;
     
    const quote = quotes[index]; 
     
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote}-${quote.author}`; 
    
    return (
      <div className="wrapper d-flex align-items-center justify-content-center">
       <div className="col-6 box p-5 rounded" id="quote-box"> 
         {quote && (
           <div className="mb-3">
             <p id="text">"{quote.quote}"</p>
             <cite className="d-block text-right" id="author">- {quote.author}</cite>  
             </div>)}
         <div className="d-flex justify-content-between">
           <a href={tweetURL} target="_blank" class="btn btn-primary" id="tweet-quote"><i className="fab fa-twitter"></i> Twitter</a>
           <button class="btn btn-primary" onClick={this.getRandomIndex} id="new-quote"><i className="fas fa-random"></i> Get quote</button>
         </div>
       </div>  
      </div>  
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
