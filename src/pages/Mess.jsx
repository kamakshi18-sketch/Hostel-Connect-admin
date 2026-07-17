import { useState } from "react"
import { Plus, Utensils, X } from "lucide-react"
import Topbar from "../components/Topbar"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner"]

const initialMenu = {
  Monday: { Breakfast: ["Poha", "Tea"], Lunch: ["Dal", "Rice"], Snacks: ["Fruit Salad"], Dinner: ["Paneer Curry"] },
  Tuesday: { Breakfast: ["Paratha", "Curd"], Lunch: ["Chole", "Rice"], Snacks: ["Biscuits"], Dinner: ["Mix Veg"] },
  Wednesday: { Breakfast: ["Idli", "Sambar"], Lunch: ["Dal", "Roti"], Snacks: ["Tea"], Dinner: ["Veg Biryani"] },
  Thursday: { Breakfast: ["Aloo Paratha"], Lunch: ["Rajma", "Rice"], Snacks: ["Juice"], Dinner: ["Aloo Gobi"] },
  Friday: { Breakfast: ["Sandwich"], Lunch: ["Rasam", "Rice"], Snacks: ["Samosa"], Dinner: ["Paneer Butter Masala"] },
  Saturday: { Breakfast: ["Pasta"], Lunch: ["Veg Curry", "Roti"], Snacks: ["Cake"], Dinner: ["Noodles"] },
  Sunday: { Breakfast: ["Dosa"], Lunch: ["Sambar", "Rice"], Snacks: ["Milk"], Dinner: ["Pulao"] },
}

export default function Mess() {
  const [menu, setMenu] = useState(initialMenu)
  const [selectedDay, setSelectedDay] = useState(days[0])
  const [selectedMeal, setSelectedMeal] = useState(mealTypes[0])
  const [item, setItem] = useState("")

  const addItem = (event) => {
    event.preventDefault()
    if (!item.trim()) return

    setMenu((current) => ({
      ...current,
      [selectedDay]: {
        ...current[selectedDay],
        [selectedMeal]: [...current[selectedDay][selectedMeal], item.trim()],
      },
    }))
    setItem("")
  }

  const removeItem = (itemName) => {
    setMenu((current) => ({
      ...current,
      [selectedDay]: {
        ...current[selectedDay],
        [selectedMeal]: current[selectedDay][selectedMeal].filter((name) => name !== itemName),
      },
    }))
  }

  return (
    <div>
      <Topbar title="Mess Menu" subtitle="Set breakfast, lunch, and dinner items for each day" />
      <div className="px-8 pb-10 space-y-5">
        <div className="rounded-2xl border border-ink-800 bg-ink-900 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Utensils size={16} />
            </div>
            <div>
              <p className="text-white font-medium">Daily mess menu</p>
              <p className="text-sm text-ink-400">Manage the menu for the whole week from one place.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`rounded-full px-3 py-1.5 text-sm ${selectedDay === day ? "bg-amber-400 text-ink-950" : "bg-ink-800 text-ink-300"}`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {mealTypes.map((meal) => (
              <button
                key={meal}
                onClick={() => setSelectedMeal(meal)}
                className={`rounded-full px-3 py-1.5 text-sm ${selectedMeal === meal ? "bg-amber-400 text-ink-950" : "bg-ink-800 text-ink-300"}`}
              >
                {meal}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-ink-800 bg-ink-950/70 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white font-medium">{selectedDay} · {selectedMeal}</p>
              <span className="text-xs text-ink-500">{menu[selectedDay][selectedMeal].length} items</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {menu[selectedDay][selectedMeal].map((itemName) => (
                <button
                  key={itemName}
                  type="button"
                  onClick={() => removeItem(itemName)}
                  className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300"
                >
                  <span>{itemName}</span>
                  <X size={12} />
                </button>
              ))}
            </div>

            <form onSubmit={addItem} className="flex gap-2">
              <input
                value={item}
                onChange={(event) => setItem(event.target.value)}
                placeholder={`Add ${selectedMeal.toLowerCase()} item`}
                className="flex-1 rounded-lg bg-ink-900 border border-ink-700 px-3 py-2 text-sm text-white outline-none"
              />
              <button type="submit" className="flex items-center gap-2 rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-ink-950">
                <Plus size={16} /> Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
