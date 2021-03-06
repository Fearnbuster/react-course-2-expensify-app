
import React from 'react';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    const { expense = {}} = props;

    const { 
      description = '',
      note = '',
      amount = '',
      createdAt = 0,
      calenderFocused = false,
      error = ''
    } = expense;

    this.state = {
      description,
      note,
      amount: amount ? (amount / 100).toString() : '',
      createdAt: createdAt ? moment(createdAt) : moment(),
      calenderFocused,
      error
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;

    this.setState(() => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;

    this.setState(() => ({ note }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calenderFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide a description and an amount' }));

      setTimeout(() => {
        this.setState(() => ({ error: '' }));
      }, 3000);
    }
    else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  
  render() {
    return (
      <div>
        {this.state.error && <h3>{this.state.error}</h3>}
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input 
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calenderFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}