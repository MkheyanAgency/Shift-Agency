import React, { useState } from 'react';
import { COURSES_DATA as initialCourses } from '../data/CoursesData';
import Modal from '../components/ui/Modal';
import { GraduationCap, Plus, Edit2, Users, Clock, CheckCircle2 } from 'lucide-react';

export default function CoursesManager() {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('shift_admin_courses');
      return saved ? JSON.parse(saved) : initialCourses;
    } catch {
      return initialCourses;
    }
  });

  const [activeCourse, setActiveCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editPrice, setEditPrice] = useState('');
  const [editSeats, setEditSeats] = useState(4);

  const handleOpenEdit = (c) => {
    setActiveCourse(c);
    setEditPrice(c.price);
    setEditSeats(c.seatsLeft);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!activeCourse) return;

    const updated = courses.map((c) =>
      c.id === activeCourse.id
        ? { ...c, price: editPrice, seatsLeft: Number(editSeats) }
        : c
    );
    setCourses(updated);
    localStorage.setItem('shift_admin_courses', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Դասընթացների Կառավարում</h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Կառավարեք ակադեմիայի գները, առկա ազատ տեղերը և դասացուցակները։
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
                {c.badge}
              </span>
              <h3 className="text-lg font-black text-white">{c.titleHy}</h3>
              <p className="text-xs text-neutral-400">{c.durationHy} • {c.formatHy}</p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block font-bold">Գին</span>
                <span className="text-lg font-black text-[#b4f846]">{c.price}</span>
              </div>

              <div>
                <span className="text-[10px] text-neutral-500 uppercase block font-bold">Ազատ տեղեր</span>
                <span className="text-lg font-black text-white">{c.seatsLeft} տեղ</span>
              </div>

              <button
                onClick={() => handleOpenEdit(c)}
                className="btn-ghost px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#b4f846]" />
                <span>Խմբագրել</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeCourse && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Խմբագրել՝ ${activeCourse.titleHy}`}
        >
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-300 font-bold mb-1">Դասընթացի Արժեք</label>
              <input
                type="text"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-bold mb-1">Մնացած Ազատ Տեղեր</label>
              <input
                type="number"
                min="0"
                max="30"
                value={editSeats}
                onChange={(e) => setEditSeats(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
              />
            </div>

            <button
              type="submit"
              className="btn-neon w-full py-3 rounded-xl text-xs font-black cursor-pointer mt-2"
            >
              ՊԱՀՊԱՆԵԼ
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
