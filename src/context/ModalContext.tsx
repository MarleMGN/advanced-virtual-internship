"use client"
import { createContext, useContext, useState } from "react"

const ModalContext = createContext<{
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
}>({ modalOpen: false, setModalOpen: () => {}, sidebarOpen: false, setSidebarOpen: () => {} })

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen, sidebarOpen, setSidebarOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}