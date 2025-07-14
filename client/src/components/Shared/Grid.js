import { FaEye, FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

function Grid({
  columns = [],
  data = [],
  onView,
  onEdit,
  onDelete,
  editModal,
  alertModal,
}) {
  const actionColumn = onView || onEdit || onDelete;
  return (
    <>
      <div className="px-2 h-[50vh] overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white dark:bg-gray-900 dark:text-gray-300">
            <tr className="border-b">
              {columns.map((col) => (
                <th key={col.field} className="text-left py-2">
                  {col.field}
                </th>
              ))}
              {
                actionColumn && <th className="text-left py-2 w-40">Actions</th>
              }
            </tr>
          </thead>
          <tbody className="dark:bg-gray-800 dark:text-gray-300">
            {data.map((item) => (
              <tr
                key={item._id}
                className={`border-b ${item.isActive === false ? "bg-red-300 dark:bg-red-700" : ""}`}
              >
                {columns.map((col) => (
                  <td key={item._id + col.field} className="py-2">
                    {col.type==='time' ?new Date(item[col.field]).toLocaleDateString():item[col.field]}
                  </td>
                ))}
                <td className="py-2">
                  {onView && (
                    <button
                      onClick={() => onView(item)}
                      title="View"
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FaEye />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      title="Edit"
                      className="ml-1 px-3 py-1 text-sm bg-orange-400 text-white rounded hover:bg-orange-500"
                    >
                      <MdModeEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      title="Delete"
                      className="ml-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {alertModal}
      {editModal}
    </>
  );
}

export default Grid;
