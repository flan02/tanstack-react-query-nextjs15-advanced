import { HardDriveUpload } from "lucide-react"
import Link from "next/link"


const VercelLink = () => {
  return (
    <Link href='/vercel' className="relative font-bold hover:underline mb-4 mr-4 flex justify-end items-end space-x-1">
      <HardDriveUpload size={24} className="mb-1.5" />
      <span className="text-lg uppercase">Vercel</span>
    </Link>
  )
}

export default VercelLink