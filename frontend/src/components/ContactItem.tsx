
import { ArrowRight } from 'lucide-react'

interface Contact {
  name: string
  visits: number
  isCompany: boolean
  logo?: string
}

interface ContactItemProps {
  contact: Contact
}

export function ContactItem({ contact }: ContactItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div 
      className="flex items-center justify-between group cursor-help hover:bg-secondary/40 rounded-md py-1 px-1 transition-colors duration-200"
      data-testid={`contact-item-${contact.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3">
        {contact.logo ? (
          <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={contact.logo} 
              alt={contact.name} 
              className="w-6 h-6 rounded-full object-cover" 
            />
          </div>
        ) : contact.isCompany ? (
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
        ) : (
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-foreground">
              {getInitials(contact.name)}
            </span>
          </div>
        )}
        <span className="text-sm text-card-foreground">{contact.name}</span>
      </div>
      <div className="flex items-center justify-center w-6 h-6">
        <span className="text-sm text-muted-foreground group-hover:hidden">{contact.visits}</span>
        <ArrowRight 
          size={16} 
          className="text-muted-foreground hidden group-hover:block cursor-help" 
        />
      </div>
    </div>
  )
}

export default ContactItem
