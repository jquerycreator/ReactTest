import React from 'react';
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Clear';
const shell_item={display:"flex",flexDirection:"row",width:"400px",}
const shell={display:"flex",flexDirection:"column",width:"400px",margin:"6px",}

class Welcome extends React.Component{
	constructor(props){
		super(props);
		this.state={mas:[]};
	}

    clickAdd(event){
      if(event.key==="Enter"){this.addRecord()}

    }
    DelText (e){ 
    	const index = [...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement)
    	let mas=JSON.parse(localStorage.getItem("masv"))
    	mas.splice(index+1,1)
    	localStorage.setItem("masv",JSON.stringify(mas))
    	e.target.parentElement.remove()
    }
    update(e){
    	let test=e.target.parentElement.parentElement.getAttribute("test")
    	let val=e.target.value
    	let mastok=test.split('')
         mastok.splice(0,1)
         mastok.splice(mastok.length-1,1)
    	let mas=JSON.parse(localStorage.getItem("masv"))
    	mas[mas.indexOf(mastok.join(''))]=val
   this.setState({mas:(()=>{
    let items=[]
     for (let count=1;count<mas.length;count++)
     	items[count]=<div style={{display:"flex",position:"relative"}} count={count}>
          	<Checkbox/>
          	<TextField  onChange={this.update.bind(this)}  test={JSON.stringify(mas[count])}  defaultValue={""+mas[count]+""} style={{flexGrow:2,alignSelf:"center"}}/>
          	<button onClick={this.DelText.bind(this)} style={{background:"white",border:"none",transform:"scale(0.7)",cursor:"pointer"}}>
          	 <Fab  disabled aria-label="Delete" style={{background:"white",color:"black",}}>
                <DeleteIcon />
              </Fab>
             </button>
          </div>
      return items
    })()})
    	localStorage.setItem("masv",JSON.stringify(mas))

    }
  componentDidMount() {
  	 if(!localStorage.getItem("masv")){
  		localStorage.setItem("masv",[])
  		return;
  	}
   let mas=JSON.parse(localStorage.getItem("masv"))
   this.setState({mas:(()=>{
    let items=[]
     for (let count=1;count<mas.length;count++)
     	items[count]=<div style={{display:"flex",position:"relative",alignItems:"center"}} count={count}>
          	<Checkbox style={{marginRight:"10px"}}/>
          	<TextField  onChange={this.update.bind(this)}  test={JSON.stringify(mas[count])}  defaultValue={""+mas[count]+""} style={{flexGrow:2}}/>
          	<button onClick={this.DelText.bind(this)} style={{background:"white",border:"none",transform:"scale(0.7)",cursor:"pointer"}}>
          	 <Fab  disabled aria-label="Delete" style={{background:"white",color:"black",}}>
                <DeleteIcon />
              </Fab>
             </button>
          </div>
      return items
    })()})
    //this.setState({mas:JSON.stringify(localStorage.getItem("masv"))})

  }
    addRecord(){
    	let mas=JSON.parse(localStorage.getItem("masv"))
    	mas.push(document.getElementById("outlined-full-width").value)
    	   this.setState({mas:(()=>{
    let items=[]
     for (let count=1;count<mas.length;count++)
     	items[count]=<div style={{display:"flex",position:"relative",}} count={count} >
          	<Checkbox style={{marginRight:"10px"}}/>
          	<TextField   defaultValue={mas[count]} style={{flexGrow:2}}/>
          	<button onClick={this.DelText.bind(this)} style={{background:"white",border:"none",transform:"scale(0.7)",cursor:"pointer"}}>
          	 <Fab  disabled aria-label="Delete" style={{background:"white",color:"black",}}>
                <DeleteIcon />
              </Fab>
             </button>
          </div>
      return items
  })()})
    	localStorage.setItem("masv",JSON.stringify(mas))
	     

    }
	render(){
		 return <React.Fragment>
		 <div style={shell} id="top">
		 <div style={shell_item} >
		 <TextField id="outlined-full-width" label="Label" style={{ margin:"6px",flexBasis:"70%" }} placeholder="Placeholder"margin="normal" variant="outlined"
        InputLabelProps={{shrink: true}} onKeyPress={this.clickAdd.bind(this)}
      />
		 <Button variant="contained" onClick={this.addRecord.bind(this)} color="secondary" style={{flexBasis:"30%"}}>ADD</Button>
               </div>
         <div>{this.state.mas}</div>
         </div>
		 </React.Fragment>
	}
}


ReactDOM.render( <Welcome/>,document.getElementById("app"))