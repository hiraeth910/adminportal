import { FC, Fragment, useEffect, useState } from "react"
import {
  Card,
  OverlayTrigger,
  Tooltip,
  Form,
  Button,
  Spinner,
} from "react-bootstrap"

import { Category } from "../../../models/category"
import CategoryForm from "./categoryform"
import { getCategories } from "../../../utils/getapi"

interface CatProps {}

const Categories: FC<CatProps> = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | undefined>(
    undefined
  )

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const _orgId = 82 // Replace with the actual orgId value
      const data = await getCategories(_orgId)
      setCategories(data)
      setFilteredCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {

    fetchCategories()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCategories(filtered)
  }

  const handleSave = async (savedCategory: Category) => {
    if (editCategory) {
      const updatedCategories = categories.map((cat) =>
        cat.categoryId === savedCategory.categoryId ? savedCategory : cat
      )
      setCategories(updatedCategories)
      setFilteredCategories(updatedCategories)
    } else {
      setCategories([...categories, savedCategory])
      setFilteredCategories([...categories, savedCategory])
    }
    setShowForm(false)
    setEditCategory(undefined)
    // Refresh categories after save
    await fetchCategories()
  }

  const handleEdit = (category: Category) => {
    setEditCategory(category)
    setShowForm(true)
  }

  const handleAddCategory = () => {
    setEditCategory(undefined)
    setShowForm(true)
  }

  return (
    <Fragment>
      <Card className='custom-card'>
        <Card.Header className='card-header d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center w-100'>
            <Form.Control
              type='text'
              placeholder='Search Categories'
              className='me-2'
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button variant='primary' onClick={handleAddCategory}>
              Add Category
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <div className='table-responsive'>
            {isLoading ? (
              <div className='d-flex justify-content-center align-items-center m-2'>
                <Spinner animation='border' variant='primary' />
                <span className='ms-2'>Loading categories...</span>
              </div>
            ) : (
              <table className='table text-nowrap table-hover border table-bordered'>
                <thead className='border-top'>
                  <tr>
                    <th scope='row' className='border-bottom-0 text-center'>
                      S.No
                    </th>
                    <th scope='row' className='border-bottom-0 text-center'>
                      Image
                    </th>
                    <th scope='row' className='border-bottom-0'>
                      Name
                    </th>
                    <th scope='row' className='border-bottom-0'>
                      Description
                    </th>
                    <th scope='row' className='border-bottom-0'>
                      Restaurant
                    </th>
                    <th scope='row' className='border-bottom-0'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr key={category.categoryId} className='border-bottom'>
                      <td className='text-center'>{index + 1}</td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='avatar avatar-md me-2 avatar-rounded lh-1'>
                            <img
                              src={`data:image/png;base64,${category.logoImage}`}
                              alt={category.name}
                            />
                          </div>
                        </div>
                      </td>
                      <td>{category.categoryName}</td>
                      <td>{category.categoryDescription}</td>
                      <td>{category.name}</td>
                      <td>
                        <div className='g-2'>
                          <input
                            type='checkbox'
                            className='form-check-input me-2'
                          />
                          <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip>Edit</Tooltip>}
                          >
                            <a
                              aria-label='anchor'
                              className='btn btn-primary-light btn-sm'
                              onClick={() => handleEdit(category)}
                            >
                              <span className='ri-pencil-line fs-14'></span>
                            </a>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement='top'
                            overlay={<Tooltip>Delete</Tooltip>}
                          >
                            <a
                              aria-label='anchor'
                              className='btn btn-danger-light btn-sm ms-2'
                            >
                              <span className='ri-delete-bin-7-line fs-14'></span>
                            </a>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card.Body>
      </Card>
      <CategoryForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        handleSave={handleSave}
        editCategory={editCategory}
      />
    </Fragment>
  )
}

export default Categories
