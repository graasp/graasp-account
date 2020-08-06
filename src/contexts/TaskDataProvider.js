import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  RESEARCH_API_ROUTE,
  TASKS_PARAMETER,
  buildTasksEndpoint,
  buildApiOptions,
} from '../api/graasp';
import { UserDataContext } from './UserDataProvider';

export const TaskDataContext = createContext();

const TaskDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [existingTask, setExistingTask] = useState();
  const [taskGetError, setTaskGetError] = useState(null);
  const [taskCreateError, setTaskCreateError] = useState(null);
  const { userId } = useContext(UserDataContext);
  const { spaceId } = useParams();

  // build endpoints that are called in this context API
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const getTaskUrl = buildTasksEndpoint(
    baseUrl,
    RESEARCH_API_ROUTE,
    TASKS_PARAMETER,
    { userId, spaceId },
  );
  const createTaskUrl = buildTasksEndpoint(
    baseUrl,
    RESEARCH_API_ROUTE,
    TASKS_PARAMETER,
  );

  // on component load, check if a task already exists for this space
  useEffect(() => {
    const fetchTask = async () => {
      if (userId) {
        try {
          const response = await fetch(getTaskUrl, buildApiOptions('GET'));
          if (!response.ok) {
            throw response;
          }
          const resolvedResponse = await response.json();
          setExistingTask(resolvedResponse);
          setIsLoading(false);
        } catch (err) {
          const resolvedErr = await err.json();
          setTaskGetError(resolvedErr);
          setIsLoading(false);
        }
      }
    };
    fetchTask();
  }, [userId, spaceId, getTaskUrl]);

  // function passed down to ExportData component, used to trigger dataset request
  const requestFullDataset = async () => {
    try {
      // requestBody as required by api endpoint
      const requestBody = JSON.stringify({ userId, spaceId });
      const createTask = await fetch(
        createTaskUrl,
        buildApiOptions('POST', { body: requestBody }),
      );
      if (!createTask.ok) {
        throw createTask;
      }
      const resolvedCreateTask = await createTask.json();
      // note here that resolvedCreateTask is a server response object with 'success', 'message', and 'task' props
      setExistingTask(resolvedCreateTask.task);
      // every 5 seconds, ping tasks endpoint to update status of task
      // this status is used by the ExportData component for conditional rendering
      setInterval(async () => {
        const response = await fetch(getTaskUrl, buildApiOptions('GET'));
        const resolvedResponse = await response.json();
        setExistingTask(resolvedResponse);
      }, 5000);
    } catch (err) {
      const resolvedErr = await err.json();
      setTaskCreateError(resolvedErr);
    }
  };

  return (
    <TaskDataContext.Provider
      value={{
        isLoading,
        existingTask,
        taskGetError,
        taskCreateError,
        requestFullDataset,
      }}
    >
      {children}
    </TaskDataContext.Provider>
  );
};

TaskDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TaskDataProvider;
