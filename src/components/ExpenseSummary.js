
import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

const createSummaryMessage = (expenses) => {
  const numberOfExpenses = expenses.length;
  const totalExpense = numeral(getExpensesTotal(expenses) / 100).format('$0,0.00');

  switch (numberOfExpenses) {
    case 0:
      return '';

    case 1:
      return <p>
          {`Viewing 1 expense totalling ${totalExpense}`}
        </p>
  
    default:
      return <p>
        {`Viewing ${numberOfExpenses} expenses totalling ${totalExpense}`}
      </p>
  }
};

export const ExpenseSummary = (props) => (
  <div>
    {createSummaryMessage(props.expenses)}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);