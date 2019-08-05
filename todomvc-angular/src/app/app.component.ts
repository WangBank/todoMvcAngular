import { Component } from '@angular/core';
const todoList = [
  {
    id: 1,
    title: '吃饭',
    done: true
  }, {
    id: 2,
    title: '睡觉',
    done: false
  }, {
    id: 3,
    title: '打豆豆',
    done: true
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todoList: {
    id: number,
    title: string,
    done: boolean
  }[] = JSON.parse(window.localStorage.getItem('todoList')||'[]')
public currentEditing:{
  id: number,
    title: string,
    done: boolean
}=null
  public addTodo(e): void {
    const titleText = e.target.value
    if (!titleText.length) {
      return
    }
    
    this.todoList.push({
      id: this.todoList[this.todoList.length -1]?this.todoList[this.todoList.length -1].id + 1:1,
      title: titleText,
      done: false
    })
    e.target.value =''
    console.log(this.todoList)
  }
  get toggleAll(){
    return this.todoList.every(t=>t.done)
  }
  set toggleAll(val){
    this.todoList.forEach(t=>t.done =val)
  }
  removeTodo(id:number){
    this.todoList.splice(id,1)
  }
  saveEdit(todo,e){
    console.log(e.target.value)
    todo.title = e.target.value;
    this.currentEditing=null;
  }
  handleEditKeyUp(e){
    const {keyCode,target} = e
    //console.log(keyCode)
    if(keyCode === 27){
    target.value = this.currentEditing.title
    this.currentEditing=null;
    }
  }

  get remaining(){
    return this.todoList.filter(t=>!t.done).length
  }

  clearAllDone(){
    this.todoList = this.todoList.filter(t=>!t.done)
  }

  ngDoCheck(){
   window.localStorage.setItem('todoList',JSON.stringify(this.todoList))
  }
  //特殊的生命周期钩子函数，在应用初始化的时候发挥作用
  //test
  ngOnInit(){
    this.hashchangehandle()
    window.onhashchange =this.hashchangehandle.bind(this)
  }
  hashchangehandle(){
    const hash = window.location.hash.substr(1)
    switch(hash){
      case '/':
        console.log(hash)
      this.vis ='all'
      break;
      case '/completed':
          console.log(hash)
        this.vis ='completed'
        break;
        case '/active':
            console.log(hash)
        this.vis ='active'
        break;
    }
  }
 public vis :string ='all';
  get filterTodos(){
    if(this.vis === 'all'){
       return this.todoList
    }
    else if(this.vis === 'active'){
      return this.todoList.filter(t=>!t.done)
    }else if(this.vis === 'completed'){
      return this.todoList.filter(t=>t.done)
    }
  }
}
