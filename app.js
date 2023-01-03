const Cash = (props) => {
  const value = (props.cash / props.ratio * props.price).toFixed(2)
  return(
    <div>{props.title} <span>{props.cash <= 0 ? "" : value}</span></div>
  )
}

class ExchangeCounter extends React.Component {
  state = { 
    amount: "",
    product: "gas"
   } 
   static defaultProps = {
    curriences: [
      {
        id: 0,
        name: 'zloty',
        ratio: 1,
        title: 'Wartość w złotówkach: '
      },
      {
        id: 1,
        name: 'dollar',
        ratio: 4.2,
        title: 'Wartość w dolarach: '
      },
      {
        id: 2,
        name: 'euro',
        ratio: 4.7,
        title: 'Wartość w euro: '
      },
      {
        id: 3,
        name: 'pound',
        ratio: 5.3,
        title: 'Wartość w funtach: '
      },
    ],
    prices: {
      electricity: .96,
      gas: 650,
      petrol: 6.49
    }
   }

   handleChange = e => {
    this.setState({
      amount: e.target.value
    })
   }

   handleSelect = e => {
    this.setState({
      product: e.target.value,
      amount: ""
    })
   }

   insertSuffix(select) {
    if(select === 'electricity') return <em> kWh</em>
    else if(select === 'gas') return <em> MWh</em>
    else if(select === 'petrol') return <em> l</em>
    else return null
   }

   selectPrice(select){
    const price = this.props.prices[select]
    return price
   }

  render() { 
    const {amount, product} = this.state
    const price = this.selectPrice(product)
    const calculators = this.props.curriences.map(currency => (
      <Cash key={currency.id} ratio={currency.ratio}title={currency.title} cash={amount} price={price}/>
    ))
     return (
      <div className="app">
        <h1>Przelicznik walut</h1>
        <label>Wybierz produkt:
          <select value={product} onChange={this.handleSelect}>
            <option value="electricity">prąd</option>
            <option value="gas">gaz</option>
            <option value="petrol">benzyna</option>
          </select>
        </label>
        
        <label>
          <input type="number" value={amount} onChange={this.handleChange} />
          {this.insertSuffix(this.state.product)}
        </label>
        <div className="calculators">{calculators}</div>
      </div>
    );
  }
}
 
ReactDOM.render(<ExchangeCounter />, document.getElementById('root'))