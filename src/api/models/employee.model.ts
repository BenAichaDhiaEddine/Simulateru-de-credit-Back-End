export {};
const mongoose = require('mongoose');
const { NOT_FOUND } = require('http-status');
import { transformData } from 'api/utils/ModelUtils';
import { Task, TaskReplacement } from 'api/models';

const APIError = require('api/utils/APIError');

/**
 * Employee Schema
 * @private
 */
const employeeSchema = new mongoose.Schema(
  {
    corporate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Corporate',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true
    },
    enable: {
      type: String,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const ALLOWED_FIELDS = ['id', 'corporate', 'user', 'enable'];
// Populate ref attribut every time
employeeSchema.pre(/^find/, function() {
  this.populate('user');
});
/**
 * Methods
 */

employeeSchema.method({
  // query is optional, e.g. to transform data for response but only include certain "fields"
  transform({ query = {} }: { query?: any } = {}) {
    // transform every record (only respond allowed fields and "&fields=" in query)
    return transformData(this, query, ALLOWED_FIELDS);
  },
  //return the employee's tasks
  async tasks(){
    try{
      const assignedTasks = await Task.find({assignee: this._id, done: false, substitute: null}).exec()
      return assignedTasks
    }catch(error){
      throw error
    }
  },
  //return the employee's taskReplacemnt
  async taskReplacemnts(){
    try{
      const replacementTasks = await TaskReplacement.find({taskOwner: this._id, end_date: { 'gt': new Date() }}).exec()
      return replacementTasks
    }catch(error){
      throw error
    }
  }
});

/**
 * Statics
 */
employeeSchema.statics = {
  /**
   * Get employee
   * @param {ObjectId} id - The objectId of employee.
   * @returns {Promise<Employee, APIError>}
   */
  async get(id: any) {
    try {
      let employee;

      if (mongoose.Types.ObjectId.isValid(id)) {
        employee = await this.findById(id).exec();
      }

      if (employee) {
        return employee;
      }

      throw new APIError({
        message: 'employee does not exist',
        status: NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
};

// Populate ref attribut every time
employeeSchema.pre(/^find/, function() {
  this.populate('user');
});

/**
 * @typedef Employee
 */
const Employee = mongoose.model('Employee', employeeSchema);
Employee.ALLOWED_FIELDS = ALLOWED_FIELDS;
module.exports = Employee;