import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Container,
  Typography,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Checkbox,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Post, Department } from './interfaces';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [openDepartments, setOpenDepartments] = useState<{ [key: number]: boolean }>({});
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      // Redirect to the first page with a message if user details are not found
      navigate('/', { state: { message: 'You must enter your details before accessing this page.' } });
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    // Hardcoding the departments data as specified
    const hardcodedDepartments: Department[] = [
      {
        id: 1,
        name: 'Human Resources',
        subDepartments: [
          { id: 1, name: 'Recruitment' },
          { id: 2, name: 'Employee Relations' },
        ],
      },
      {
        id: 2,
        name: 'IT Department',
        subDepartments: [
          { id: 3, name: 'Infrastructure' },
          { id: 4, name: 'Development' },
        ],
      },
    ];
    setDepartments(hardcodedDepartments);
  }, []);

  const handleDepartmentClick = (id: number) => {
    setOpenDepartments((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setSelectedDepartments((prevState) => ({
      ...prevState,
      [id]: event.target.checked,
    }));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, backgroundColor: '#000000', p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FFFFFF', borderBottom: '3px solid #1E88E5' }}>
          Posts Data
        </Typography>
        <Paper
          elevation={3}
          sx={{ height: 400, width: '100%', mb: 5, backgroundColor: '#f0f0f0', border: '4px solid #1E88E5', padding: 0 }}
        >
          <DataGrid
            rows={posts}
            columns={columns}
            autoHeight // Adjusts height based on content
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#e0e0e0',
                color: '#000000', // Ensure header text is black
              },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(odd)': { backgroundColor: '#ADD8E6' },
                '&:nth-of-type(even)': { backgroundColor: '#FFFFFF' },
              },
              '& .MuiDataGrid-cell': {
                color: '#000000', // Ensure cell text is black
              },
            }}
          />
        </Paper>

        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FFFFFF', borderBottom: '3px solid #FF7043' }}>
          Departments
        </Typography>
        <Paper elevation={3} sx={{ p: 2, backgroundColor: '#424242', border: '4px solid #FF7043' }}>
          <List>
            {departments.map((department) => (
              <div key={department.id}>
                <ListItem button onClick={() => handleDepartmentClick(department.id)}>
                  <ListItemText primary={department.name} sx={{ color: '#FFFFFF' }} />
                  <ListItemIcon>
                    {openDepartments[department.id] ? (
                      <ExpandLessIcon sx={{ color: '#FFFFFF' }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: '#FFFFFF' }} />
                    )}
                  </ListItemIcon>
                </ListItem>
                <Collapse in={openDepartments[department.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {department.subDepartments.map((subDept) => (
                      <ListItem key={subDept.id} sx={{ pl: 4 }}>
                        <Checkbox
                          checked={selectedDepartments[subDept.id] || false}
                          onChange={(event) => handleCheckboxChange(event, subDept.id)}
                          color="primary"
                        />
                        <ListItemText primary={subDept.name} sx={{ color: '#FFFFFF' }} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default SecondPage;
