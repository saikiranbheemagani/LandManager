import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getProjectRequests, removeProjectRequest } from '../api';

const ProjectRequestList = () => {
  const [projectRequests, setProjectRequests] = useState([]);

  useEffect(() => {
    getProjectRequests()
      .then((data) => {
        setProjectRequests(data.projects);
      })
      .catch((error) => {
        console.error('Error fetching Project Request:', error);
      });
  }, []);

  const handleRemoveProjectRequest = async (projectRequestId) => {
    try {
      await removeProjectRequest(projectRequestId);
      const updatedProjectRequests = await getProjectRequests();
      setProjectRequests(updatedProjectRequests.data);
    } catch (error) {
      console.error('Error removing Project Request:', error);
    }
  };

  return (
    <div className="p-4 space-y-8" data-cy="project-requests-list">
      {projectRequests.length > 0 && (
        <Card  className="bg-blue-500 p-4 rounded-lg">
          <CardContent>
            <Typography variant="h5" className="text-white mb-4">
              Project Request List
            </Typography>
            <Grid container spacing={3}>
              {projectRequests
                .filter((projectrequest) => projectrequest.status === 'open')
                .map((projectrequest) => (
                  <Grid item key={projectrequest._id} xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/user/projects/${projectrequest._id}`}>
                      <Card className="hover:shadow-lg transition duration-300" data-cy="project-request-item">
                        <CardContent>
                          <Typography variant="h6">{projectrequest.title}</Typography>
                          <Typography>Status: {projectrequest.status}</Typography>
                          <div className="mt-4 flex items-center space-x-4">
                            <IconButton
                              color="secondary"
                              onClick={() => handleRemoveProjectRequest(projectrequest._id)}
                            >
                              <Delete />
                            </IconButton>
                            <div>Cancel Request</div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {projectRequests.length === 0 && (
        <Typography variant="body1" className="text-gray-500">
          You don't have any project requests.
        </Typography>
      )}

      {projectRequests.length > 0 && (
        <Card className="bg-green-500 p-4 rounded-lg">
          <CardContent>
            <Typography variant="h5" className="text-white mb-4">
              Project List
            </Typography>
            <Grid container spacing={3}>
              {projectRequests.map((projectrequest) => (
                <Grid item key={projectrequest._id} xs={12} sm={6} md={4} lg={3}>
                  <Link to={`/user/projects/${projectrequest._id}`}>
                    <Card className="hover:shadow-lg transition duration-300">
                      <CardContent>
                        <Typography variant="h6">{projectrequest.title}</Typography>
                        <Typography>Status: {projectrequest.status}</Typography>
                        <div className="mt-4 flex items-center space-x-4">
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveProjectRequest(projectrequest._id)}
                          >
                            <Delete />
                          </IconButton>
                          <div>Cancel Request</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {projectRequests.length === 0 && (
        <Typography variant="body1" className="text-gray-500">
          You don't have any projects.
        </Typography>
      )}
    </div>
  );
};

export default ProjectRequestList;

