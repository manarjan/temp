import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Send, Server, Activity, FileText, BarChart, Settings, MessageSquare, ChevronRight, Network, Cpu, HardDrive, Users, Bell, Shield } from 'lucide-react'

type Message = {
  text: string
  sender: 'user' | 'bot'
}

type ServerStatus = {
  name: string
  status: 'online' | 'offline' | 'warning'
  cpu: number
  memory: number
}

type SyslogEntry = {
  timestamp: string
  level: 'info' | 'warning' | 'error'
  message: string
}

const mockServers: ServerStatus[] = [
  { name: 'Web Server 1', status: 'online', cpu: 45, memory: 60 },
  { name: 'Database Server', status: 'warning', cpu: 80, memory: 75 },
  { name: 'File Server', status: 'online', cpu: 30, memory: 50 },
  { name: 'Backup Server', status: 'offline', cpu: 0, memory: 0 },
  { name: 'API Server', status: 'online', cpu: 55, memory: 65 },
  { name: 'Cache Server', status: 'online', cpu: 40, memory: 55 },
]

const mockSyslogs: SyslogEntry[] = [
  { timestamp: '2023-06-15 10:30:15', level: 'info', message: 'System startup completed' },
  { timestamp: '2023-06-15 11:45:22', level: 'warning', message: 'High CPU usage detected on Database Server' },
  { timestamp: '2023-06-15 12:15:03', level: 'error', message: 'Backup Server connection lost' },
  { timestamp: '2023-06-15 13:00:45', level: 'info', message: 'Scheduled maintenance started' },
  { timestamp: '2023-06-15 14:22:18', level: 'warning', message: 'Low disk space on File Server' },
  { timestamp: '2023-06-15 15:10:33', level: 'info', message: 'New security patch applied to Web Server 1' },
]

function Sidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>(['dashboard'])
  const location = useLocation()

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    )
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="w-64 bg-muted p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">NetOps Center</div>
      <nav className="space-y-2">
        <Collapsible open={openMenus.includes('dashboard')} onOpenChange={() => toggleMenu('dashboard')}>
          <CollapsibleTrigger asChild>
            <Button variant={isActive('/') || isActive('/performance') ? 'secondary' : 'ghost'} className="w-full justify-between">
              <div className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                Dashboard
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${openMenus.includes('dashboard') ? 'rotate-90' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-2 mt-2">
            <Button variant={isActive('/') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/">
                <Activity className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            <Button variant={isActive('/performance') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/performance">
                <Cpu className="mr-2 h-4 w-4" />
                Performance
              </Link>
            </Button>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible open={openMenus.includes('servers')} onOpenChange={() => toggleMenu('servers')}>
          <CollapsibleTrigger asChild>
            <Button variant={isActive('/servers') || isActive('/servers/config') ? 'secondary' : 'ghost'} className="w-full justify-between">
              <div className="flex items-center">
                <Server className="mr-2 h-4 w-4" />
                Servers
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${openMenus.includes('servers') ? 'rotate-90' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-2 mt-2">
            <Button variant={isActive('/servers') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/servers">
                <HardDrive className="mr-2 h-4 w-4" />
                Server List
              </Link>
            </Button>
            <Button variant={isActive('/servers/config') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/servers/config">
                <Settings className="mr-2 h-4 w-4" />
                Configuration
              </Link>
            </Button>
          </CollapsibleContent>
        </Collapsible>
        
        <Button variant={isActive('/logs') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
          <Link to="/logs">
            <FileText className="mr-2 h-4 w-4" />
            Logs
          </Link>
        </Button>
        
        <Collapsible open={openMenus.includes('network')} onOpenChange={() => toggleMenu('network')}>
          <CollapsibleTrigger asChild>
            <Button variant={isActive('/network') || isActive('/network/traffic') ? 'secondary' : 'ghost'} className="w-full justify-between">
              <div className="flex items-center">
                <Network className="mr-2 h-4 w-4" />
                Network
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${openMenus.includes('network') ? 'rotate-90' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-2 mt-2">
            <Button variant={isActive('/network') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/network">
                <Activity className="mr-2 h-4 w-4" />
                Topology
              </Link>
            </Button>
            <Button variant={isActive('/network/traffic') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/network/traffic">
                <BarChart className="mr-2 h-4 w-4" />
                Traffic
              </Link>
            </Button>
          </CollapsibleContent>
        </Collapsible>
        
        <Button variant={isActive('/chat') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
          <Link to="/chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat Support
          </Link>
        </Button>
        
        <Collapsible open={openMenus.includes('settings')} onOpenChange={() => toggleMenu('settings')}>
          <CollapsibleTrigger asChild>
            <Button variant={isActive('/settings') || isActive('/settings/notifications') || isActive('/settings/security') ? 'secondary' : 'ghost'} className="w-full justify-between">
              <div className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${openMenus.includes('settings') ? 'rotate-90' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-2 mt-2">
            <Button variant={isActive('/settings') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                General
              </Link>
            </Button>
            <Button variant={isActive('/settings/notifications') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/settings/notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Link>
            </Button>
            <Button variant={isActive('/settings/security') ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
              <Link to="/settings/security">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Link>
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </div>
  )
}

function Dashboard() {
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null)

  const runDiagnostic = () => {
    if (selectedServer) {
      setDiagnosticResult(`Running diagnostic on ${selectedServer}...\n\nDiagnostic complete. No issues found.`)
    }
  }

  const getStatusCounts = () => {
    const counts = { online: 0, offline: 0, warning: 0 }
    mockServers.forEach(server => counts[server.status]++)
    return counts
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Server Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{mockServers.length}</div>
            <div className="text-muted-foreground">Total Servers</div>
          </div>
          <div className="mt-4 flex justify-between">
            <Badge variant="default" className="text-lg">{statusCounts.online} Online</Badge>
            <Badge variant="destructive" className="text-lg">{statusCounts.offline} Offline</Badge>
            <Badge variant="warning" className="text-lg">{statusCounts.warning} Warning</Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Server Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockServers.map((server) => (
              <div key={server.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <Server className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-medium">{server.name}</div>
                    <div className="text-sm text-muted-foreground">CPU: {server.cpu}% | RAM: {server.memory}%</div>
                  </div>
                </div>
                <Badge variant={server.status === 'online' ? 'default' : server.status === 'warning' ? 'warning' : 'destructive'}>
                  {server.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Run Diagnostic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Select onValueChange={setSelectedServer}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a server" />
              </SelectTrigger>
              <SelectContent>
                {mockServers.map((server) => (
                  <SelectItem key={server.name} value={server.name}>{server.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={runDiagnostic} disabled={!selectedServer}>
              Run Diagnostic
            </Button>
          </div>
          {diagnosticResult && (
            <ScrollArea className="h-[100px] mt-4 p-2 border rounded">
              <pre className="text-sm">{diagnosticResult}</pre>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function Logs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          {mockSyslogs.map((log, index) => (
            <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{log.timestamp}</span>
                <Badge variant={log.level === 'info' ? 'default' : log.level === 'warning' ? 'warning' : 'destructive'}>
                  {log.level}
                </Badge>
              </div>
              <p className="text-sm">{log.message}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function ChatSupport() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your network diagnostic assistant. How can I help you today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      respondToMessage(input)
      setInput('')
    }
  }

  const respondToMessage = (message: string) => {
    const lowerMessage = message.toLowerCase()
    let response = "I'm sorry, I don't understand. Can you please provide more details about your networking issue?"

    if (lowerMessage.includes('internet') && lowerMessage.includes('slow')) {
      response = "If your internet is slow, try these steps:\n1. Restart your router and modem\n2. Check for any ongoing service outages in your area\n3. Run a speed test to confirm the issue\n4. If problems persist, contact your ISP"
    } else if (lowerMessage.includes('wifi') && lowerMessage.includes('connect')) {
      response = "If you're having trouble connecting to WiFi:\n1. Ensure WiFi is turned on on your device\n2. Verify you're trying to connect to the correct network\n3. Forget the network and reconnect\n4. Restart your device and router"
    } else if (lowerMessage.includes('ip') && lowerMessage.includes('conflict')) {
      response = "To resolve an IP address conflict:\n1. Release and renew your IP address\n2. Set a static IP address outside the DHCP range\n3. Check for duplicate MAC addresses on the network\n4. Ensure your router's DHCP server is configured correctly"
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }])
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col h-[600px]">
          <ScrollArea className="flex-grow p-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                    {message.sender === 'bot' && (
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                    )}
                  </Avatar>
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Performance() {
  return <div>Performance Dashboard (To be implemented)</div>
}

function ServerList() {
  return <div>Server List (To be implemented)</div>
}

function ServerConfig() {
  return <div>Server Configuration (To be implemented)</div>
}

function NetworkTopology() {
  return <div>Network Topology (To be implemented)</div>
}

function NetworkTraffic() {
  return <div>Network Traffic (To be implemented)</div>
}

function Settings() {
  return <div>General Settings (To be implemented)</div>
}

function NotificationSettings() {
  return <div>Notification Settings (To be implemented)</div>
}

function SecuritySettings() {
  return <div>Security Settings (To be implemented)</div>
}

export default function NetworkMonitoringApp() {
  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/servers" element={<ServerList />} />
            <Route path="/servers/config" element={<ServerConfig />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/network" element={<NetworkTopology />} />
            <Route path="/network/traffic" element={<NetworkTraffic />} />
            <Route path="/chat" element={<ChatSupport />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />
            <Route path="/settings/security" element={<SecuritySettings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
