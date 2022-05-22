import type { NextPage, GetServerSideProps } from 'next'
import type { Ingredients } from './api/cookbook'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'


interface IProps {
  ingredients: Ingredients
}
type MainIngredientName = 'Paprika' | 'Aubergine'



const Home: NextPage<IProps> = ({ ingredients }) => {

  const [selectedMainIngredient, setSelectedMainIngredient] = useState<MainIngredientName>('Paprika')

  const handleSelectionChange = (event: SelectChangeEvent) => {
    const selectedMainIngredient = event.target.value as MainIngredientName
    setSelectedMainIngredient(selectedMainIngredient)
  }

  return (
    <div className={styles.home_container}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Main Ingredient</InputLabel>
        <Select value={selectedMainIngredient} onChange={handleSelectionChange} label="mainIngredient">
          {ingredients.main_ingredients?.map(({ name }, index: number) => (
            <MenuItem key={index} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <h2>
          Based on your selected main ingredient, these are the remaining ingredients:
        </h2>
        <ul className={styles.ul}>
          {ingredients.other_ingredients
            ?.filter(otherIngredient => otherIngredient.name !== selectedMainIngredient)
            .map(({ name, color }, index) => (
              <li key={index} style={{ color }}>
                <img src={`/vegetables/${name}.png`} alt={`${name}_img`} />
                {name}
              </li>)
            )}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/cookbook')
  const ingredients: Ingredients = await res.json()
  return {
    props: {
      ingredients
    }
  }
}

export default Home
