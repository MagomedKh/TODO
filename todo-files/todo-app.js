(function () {

   function createAppTitle(title) {
      let appTitle = document.createElement('h2')
      appTitle.innerHTML = title
      return appTitle
   }

   function createTodoItemForm() {
      let form = document.createElement('form')
      let input = document.createElement('input')
      let buttonWrapper = document.createElement('div')
      let button = document.createElement('button')

      form.classList.add('input-group', 'mb-3')
      input.classList.add('form-control')
      input.placeholder = 'Введите название нового дела'
      buttonWrapper.classList.add('input-group-append')
      button.classList.add('btn', 'btn-primary')
      button.textContent = 'Добавить дело'

      buttonWrapper.append(button)
      form.append(input)
      form.append(buttonWrapper)

      return {
         form,
         input,
         button
      }
   }

   function createTodoList() {
      let list = document.createElement('ul')
      list.classList.add('list-group')
      return list
   }

   const todoList = createTodoList()

   function createTodoApp(container, title = 'Список дел', readyTodoListArr, todoID) {

      if (readyTodoListArr.length > 0) {
         for (let a of readyTodoListArr) {
            if (a.itemDone[1] === todoID) {
               let todoItem = createTodoItem(a)

               todoItem.doneButton.addEventListener('click', function () {
                  todoItem.item.classList.toggle('list-group-item-success')
                  localStorage.setItem(a.itemTitle, JSON.stringify([(todoItem.item.classList.contains('list-group-item-success')), todoID]))
               })

               todoItem.deleteButton.addEventListener('click', function () {
                  if (confirm('Вы уверены?')) {
                     todoItem.item.remove()
                     localStorage.removeItem(a.itemTitle)
                  }
               })

               if (a.itemDone[0] === true) {
                  todoItem.item.classList.toggle('list-group-item-success')
               }
               todoList.append(todoItem.item)
            }
         }
      }


      let todoAppTitle = createAppTitle(title)
      let todoItemForm = createTodoItemForm()
      todoList.getAttribute('id', 'todoList')

      container.append(todoAppTitle)
      container.append(todoItemForm.form)
      container.append(todoList)


      if (!todoItemForm.input.value) {
         let button = document.querySelector('button')
         button.setAttribute('disabled', 'true')
      }//                                             btn disabled
      todoItemForm.input.addEventListener('input', function () {
         if (!todoItemForm.input.value) {
            let button = document.querySelector('button')
            button.setAttribute('disabled', 'true')
         } else {
            let button = document.querySelector('button')
            button.removeAttribute('disabled')
         }
      })

      // let todoDiv = document.getElementById('todo-app')
      // function getTodoID(todoClass) {
      //    if (todoDiv.classList.contains(todoClass)) {
      //       todoID = todoClass
      //    }
      // }
      // getTodoID('my')
      // getTodoID('mom')
      // getTodoID('dad')

      todoItemForm.form.addEventListener('submit', function (e) {
         e.preventDefault()

         if (!todoItemForm.input.value) {
            return
         }

         let itemTitleValue = todoItemForm.input.value
         let itemDoneValue
         let itemObj = { itemTitle: itemTitleValue, itemDone: itemDoneValue }
         let todoItem = createTodoItem(itemObj)


         todoItem.doneButton.addEventListener('click', function () {
            todoItem.item.classList.toggle('list-group-item-success')
            localStorage.setItem(itemTitleValue, JSON.stringify([(todoItem.item.classList.contains('list-group-item-success')), todoID]))
         })
         todoItem.deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
               todoItem.item.remove()
               localStorage.removeItem(itemTitleValue)
            }
         })

         todoList.append(todoItem.item)

         todoItemForm.input.value = ''
         todoItemForm.button.setAttribute('disabled', 'true')

         function connectionLS() {
            localStorage.setItem(itemTitleValue, JSON.stringify([false, todoID]))
            // localStorage.setItem(itemTitleValue, JSON.stringify([(todoItem.item.classList.contains('list-group-item-success')), todoID]))'
         }
         connectionLS()
      })
   }

   window.createTodoApp = createTodoApp;
})()


function createTodoItem(itemObj) {
   let item = document.createElement('li')
   let buttonGroup = document.createElement('div')
   let doneButton = document.createElement('button')
   let deleteButton = document.createElement('button')

   item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
   item.textContent = itemObj.itemTitle
   if (itemObj.itemDone === true) {
      item.classList.toggle('list-group-item-success')
   }


   buttonGroup.classList.add('btn-group', 'btn-group-sm')
   doneButton.classList.add('btn', 'btn-success')
   doneButton.textContent = 'Готово!'
   deleteButton.classList.add('btn', 'btn-danger')
   deleteButton.textContent = 'Удалить'

   buttonGroup.append(doneButton)
   buttonGroup.append(deleteButton)
   item.append(buttonGroup)

   return {
      item,
      doneButton,
      deleteButton,
   }
}






