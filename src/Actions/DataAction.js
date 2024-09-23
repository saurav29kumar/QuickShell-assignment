import axios from "axios";

// Define action types as constants
const DATA_REQUEST = "DATA_REQUEST";
const DATA_SUCCESS = "DATA_SUCCESS";
const DATA_FAILURE = "DATA_FAILURE";
const SELECT_DATA_REQUEST = "SELECT_DATA_REQUEST";
const SELECT_DATA_SUCCESS = "SELECT_DATA_SUCCESS";
const SELECT_DATA_FAILURE = "SELECT_DATA_FAILURE";

export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_REQUEST });
    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );
    dispatch({ type: DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DATA_FAILURE, payload: error.message });
  }
};

export const selectData =
  (group, allTickets, orderValue) => async (dispatch) => {
    try {
      dispatch({ type: SELECT_DATA_REQUEST });
      let user = false;
      let uniqueSet = new Set();
      let filteredArray = [],
        selectedData = [];

      if (group === "status") {
        allTickets.forEach((element) => {
          uniqueSet.add(element.status);
        });
        const statusArray = [...uniqueSet];
        statusArray.forEach((status, index) => {
          const statusGroup = allTickets.filter((ticket) => {
            return status === ticket.status;
          });
          selectedData.push({
            [index]: {
              title: status,
              value: statusGroup,
            },
          });
        });
      } else if (group === "user") {
        user = true;
        allTickets?.allUser?.forEach((element, index) => {
          filteredArray = allTickets?.allTickets?.filter((ticket) => {
            return element.id === ticket.userId;
          });
          selectedData.push({
            [index]: {
              title: element.name,
              value: filteredArray,
            },
          });
        });
      } else {
        const priorityList = ["No priority", "Urgent", "High", "Medium", "Low"];
        priorityList.forEach((priority, index) => {
          filteredArray = allTickets.filter((ticket) => {
            return index === ticket.priority;
          });

          selectedData.push({
            [index]: {
              title: priority,
              value: filteredArray,
            },
          });
        });
      }

      // Sorting based on orderValue
      if (orderValue === "title") {
        selectedData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
        });
      }
      if (orderValue === "priority") {
        selectedData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => b.priority - a.priority);
        });
      }

      dispatch({ type: SELECT_DATA_SUCCESS, payload: { selectedData, user } });
    } catch (error) {
      dispatch({ type: SELECT_DATA_FAILURE, payload: error.message });
    }
  };
