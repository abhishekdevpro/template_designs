import { User } from "lucide-react"

const ProfileSection = ({ visits }) => {
    return (
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User/>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Your Abroadium ID</h3>
              {/* <p className="text-gray-600">Your total visits: {visits} visitors</p> */}
            </div>
          </div>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            View Profile & Visits
          </button>
        </div>
      </div>
    )
  }
  
  export default ProfileSection
  
  