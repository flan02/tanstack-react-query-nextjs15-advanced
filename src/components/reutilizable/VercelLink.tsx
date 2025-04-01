import { HardDriveUpload } from "lucide-react"
import Link from "next/link"


const VercelLink = () => {
  return (
    <Link href='/vercel' className="absolute bottom-2 right-1 hover:underline flex items-end space-x-1">
      <HardDriveUpload size={24} className="mb-1.5" />
      <span className="text-lg uppercase">Vercel</span>
    </Link>
  )
}

export default VercelLink