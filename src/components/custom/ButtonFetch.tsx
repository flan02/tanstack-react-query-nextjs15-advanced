import { ButtonTypes } from "@/types"
import { Button } from "../ui/button"

type ButtonFetchProps = {
  category: ButtonTypes
  setCategory: (category: ButtonTypes) => void
}

export const ButtonFetch: React.FC<ButtonFetchProps> = ({ category, setCategory }) => {

  return (
    <Button
      variant={category === category ? "default" : "outline"}
      onClick={() => setCategory(category)}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Button>
  )
}