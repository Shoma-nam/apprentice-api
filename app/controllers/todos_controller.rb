class TodosController < ApplicationController
    def index
        @todos = Todo.all
        # render json: { todos: todos.as_json(only: [:id, :title]) }
    end

    def create
      todo = Todo.new(todo_params)
      if todo.save
        render json: { todo: todo.as_json(only: [:id, :title]) }, status: :created
      else
        render json: { errors: todo.errors }, status: :unprocessable_entity
      end
    end

    def update
        todo = Todo.find(params[:id])
        if todo.update(todo_params)
          render json: { todo: todo }
        else
          render json: { errors: todo.errors }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @todo = Todo.find(params[:id])
        @todo.destroy
        head :no_content
    end

    private

    def todo_params
      params.require(:todo).permit(:title)
    end
  end
