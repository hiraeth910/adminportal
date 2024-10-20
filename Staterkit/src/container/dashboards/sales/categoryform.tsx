import React, { FC, useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { Newcategory } from "../../../models/category"
import { Category } from "../../../models/category"
import { saveCategory } from "../../../utils/setapi"

interface CategoryFormProps {
  show: boolean
  handleClose: () => void
  handleSave: (category: Category) => void
  editCategory?: Category
}

const CategoryForm: FC<CategoryFormProps> = ({
  show,
  handleClose,
  handleSave,
  editCategory,
}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageContent, setImageContent] = useState<string>("")
  const [isActive, setIsActive] = useState(false)
  const [id,setId] = useState(-1)
  const [flag,setFlag]=useState("I")
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.categoryName)
      setDescription(editCategory.categoryDescription)
      setIsActive(editCategory.active === 1)
      setImageContent(editCategory.logoImage)
      setId(editCategory.id)
      setFlag("U")
    } else {
      setName("")
      setDescription("")
      setImageContent("")
      setIsActive(false)
    }
  }, [editCategory])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageContent(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newCategory: Newcategory = {
      id:id,
      flag:flag,
      orgId:82, // Replace with the actual value or remove if unnecessary
      name,
      description,
      imageContent:[],
      active: isActive ? 1 : 0,
    }

    const savedCategory = await saveCategory(newCategory) // Save the category and get the response
    if (savedCategory) {
      handleSave(savedCategory) // Pass the saved category back to the parent component
    }
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editCategory ? "Edit Category" : "Add Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId='formImage'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='file' onChange={handleImageChange} />
          </Form.Group>
          <Form.Group controlId='formActive'>
            <Form.Check
              type='checkbox'
              label='Active'
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CategoryForm
