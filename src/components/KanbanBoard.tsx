import React, { useState, useEffect } from "react";
import TicketCard, { type Ticket } from "./TicketCard";

const COLUMNS = [
  { key: "unstarted", label: "Unstarted" },
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

const STORAGE_KEY = "kanban_tickets";

const defaultTickets: Ticket[] = [
  {
    id: "1",
    title: "Set up project",
    description: "Initialize repo and Vite app",
    status: "unstarted",
  },
  {
    id: "2",
    title: "Design Kanban UI",
    description: "Create columns and cards",
    status: "unstarted",
  },
  {
    id: "3",
    title: "Implement drag & drop",
    description: "Allow moving cards",
    status: "inprogress",
  },
  {
    id: "4",
    title: "Test board",
    description: "Check all features work",
    status: "completed",
  },
];

const KanbanBoard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTickets(JSON.parse(stored));
      } catch {
        setTickets(defaultTickets);
      }
    } else {
      setTickets(defaultTickets);
    }
  }, []);

  // Save to localStorage on tickets change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  // Drag handlers
  const onDragStart = (id: string) => setDraggedId(id);
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (status: string) => {
    if (draggedId) {
      setTickets((tickets) =>
        tickets.map((t) => (t.id === draggedId ? { ...t, status } : t))
      );
      setDraggedId(null);
    }
  };

  // Card editing
  const handleEdit = (id: string, field: keyof Ticket, value: string) => {
    setTickets((tickets) =>
      tickets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  // Create new card
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTickets((tickets) => [
      {
        id: Date.now().toString(),
        title: newTitle,
        description: newDesc,
        status: "unstarted",
      },
      ...tickets,
    ]);
    setNewTitle("");
    setNewDesc("");
  };

  // Delete card
  const handleDelete = (id: string) => {
    setTickets((tickets) => tickets.filter((t) => t.id !== id));
  };

  return (
    <div className="kanban-board">
      <div className="kanban-columns">
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            className="kanban-column"
            onDragOver={onDragOver}
            onDrop={() => onDrop(col.key)}>
            <div className="kanban-column-title">{col.label}</div>
            {col.key === "unstarted" && (
              <form className="kanban-create-form" onSubmit={handleCreate}>
                <input
                  className="kanban-card-title"
                  placeholder="New ticket title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
                <textarea
                  className="kanban-card-desc"
                  placeholder="Description (optional)"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
                <button className="kanban-create-btn" type="submit">
                  Add
                </button>
              </form>
            )}
            <div className="kanban-column-cards">
              {tickets
                .filter((t) => t.status === col.key)
                .map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    columns={COLUMNS}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDragStart={onDragStart}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
