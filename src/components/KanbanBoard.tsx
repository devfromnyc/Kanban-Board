import React, { useState, useEffect } from "react";
import TicketCard, { type Ticket } from "./TicketCard";
import { useAuth } from "../contexts/AuthContext";

const COLUMNS = [
  { key: "unstarted", label: "Unstarted" },
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

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
  const { username, isAuthenticated } = useAuth();
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState("unstarted");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Always normalize username for the board key
  const normalizedUsername = username ? username.trim().toLowerCase() : null;
  const STORAGE_KEY = normalizedUsername
    ? `kanban_tickets_${normalizedUsername}`
    : null;

  // Load tickets for the logged-in user (only when username is available)
  useEffect(() => {
    if (!normalizedUsername || !STORAGE_KEY) {
      setTickets(null);
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log(
      "[KanbanBoard] Username:",
      normalizedUsername,
      "Storage Key:",
      STORAGE_KEY
    );
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTickets(parsed);
        console.log(
          "[KanbanBoard] Loaded ticket data from localStorage:",
          parsed
        );
      } catch {
        setTickets(defaultTickets);
        console.log(
          "[KanbanBoard] Failed to parse ticket data, loaded default tickets."
        );
      }
    } else {
      setTickets(defaultTickets);
      console.log(
        "[KanbanBoard] No ticket data found, loaded default tickets."
      );
    }
    // eslint-disable-next-line
  }, [normalizedUsername, STORAGE_KEY]);

  // Save tickets to localStorage for the current user (only if tickets is not null and username is available)
  useEffect(() => {
    if (normalizedUsername && STORAGE_KEY && tickets !== null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    }
    // eslint-disable-next-line
  }, [tickets, normalizedUsername, STORAGE_KEY]);

  // Drag handlers
  const onDragStart = (id: string) => setDraggedId(id);
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (status: string) => {
    if (draggedId) {
      setTickets((tickets) =>
        tickets
          ? tickets.map((t) => (t.id === draggedId ? { ...t, status } : t))
          : null
      );
      setDraggedId(null);
    }
  };

  // Card editing
  const handleEdit = (id: string, field: keyof Ticket, value: string) => {
    setTickets((tickets) =>
      tickets
        ? tickets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
        : null
    );
  };
  const handleStartEdit = (id: string) => setEditingId(id);
  const handleStopEdit = () => setEditingId(null);

  // Create new card
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTicket = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      status: newStatus,
    };
    setTickets((tickets) => (tickets ? [newTicket, ...tickets] : [newTicket]));
    setNewTitle("");
    setNewDesc("");
    setNewStatus("unstarted");
    setShowModal(false);
    console.log(
      "[KanbanBoard] Created new ticket:",
      newTicket,
      "Title:",
      newTicket.title
    );
  };

  // Delete card
  const handleDelete = (id: string) => {
    setTickets((tickets) =>
      tickets ? tickets.filter((t) => t.id !== id) : null
    );
    if (editingId === id) setEditingId(null);
  };

  if (!isAuthenticated || !normalizedUsername || tickets === null) return null;

  return (
    <div className="kanban-board">
      <button className="kanban-add-btn" onClick={() => setShowModal(true)}>
        Add Ticket
      </button>
      {showModal && (
        <div
          className="kanban-modal-overlay"
          onClick={() => setShowModal(false)}>
          <div className="kanban-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="kanban-modal-close"
              aria-label="Close"
              onClick={() => setShowModal(false)}>
              ✕
            </button>
            <h2>Add Ticket</h2>
            <form className="kanban-create-form" onSubmit={handleCreate}>
              <input
                className="kanban-card-title"
                placeholder="Ticket title"
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
              <select
                className="kanban-card-status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}>
                {COLUMNS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="kanban-modal-actions">
                <button
                  className="kanban-create-btn kanban-create-btn-lg"
                  type="submit">
                  Add
                </button>
                <button
                  type="button"
                  className="kanban-create-btn kanban-create-btn-cancel"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="kanban-columns">
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            className="kanban-column"
            onDragOver={onDragOver}
            onDrop={() => onDrop(col.key)}>
            <div className="kanban-column-title">{col.label}</div>
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
                    isEditing={editingId === ticket.id}
                    onStartEdit={handleStartEdit}
                    onStopEdit={handleStopEdit}
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
