import { Box, Button, IconButton, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteCategory, selectCategories } from "./categorySlice"
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';

export const CategoryList = () => {
    const categories = useAppSelector(selectCategories)
    const dispatch = useAppDispatch()

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        },
    }

    //use categories to create rows
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
    }))

    //use categories to create columns
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell,
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: "boolean",
            renderCell: renderIsActiveCell,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'id',
            headerName: "Actions",
            type: "string",
            flex: 1,
            renderCell: renderActionsCell,
        }
    ];

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
                <Link
                    style={{ textDecoration: "none" }}
                    to={`/categories/edit/${rowData.id}`}
                >
                    <Typography color="primary">{rowData.value}</Typography>
                </Link>
        )
    } 
    
    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography
                color={rowData.value ? "primary" : "secondary"}
            >
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        )
    }

    function handleDeleteCategory(id: string) {
        dispatch(deleteCategory(id))
    }

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDeleteCategory(params.value)}
                aria-label="delete"            
            >
                <DeleteIcon />
            </IconButton>
        )
    }

    return (
        <Box
            maxWidth="lg"
            sx={{
                mt: 4,
                mb: 4
            }}
        >
            <Box
                display="flex"
                justifyContent="flex-end"
            >
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>

            <Box sx={{ display: "flex", height: 600 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    disableColumnSelector
                    disableColumnFilter
                    disableDensitySelector
                    disableSelectionOnClick
                    componentsProps={componentProps}
                    rowsPerPageOptions={[2, 10, 20, 100]}
                />
            </Box>
        </Box>
    )
}
