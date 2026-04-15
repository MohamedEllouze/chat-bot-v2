# 🤖 Fullstack Support Chatbot Kata

**Version: 1.1**

## 🌟 Context

Build a simple, functional fullstack MVP for a keyword-based support chatbot that demonstrates basic real-time communication between frontend and backend.

## 📋 Instructions

Develop a simplified chatbot MVP demonstrating basic conversation capabilities with predefined responses based on keywords. The backend should handle the message processing logic and response selection, while the frontend provides a simple chat interface.

### 🔧 Constraints

| Aspect | Detail |
|--------|--------|
| **⏱️ Recommended Time** | 3-4 hours |
| **🖥️ Backend** | Node.js with Express or other framework (align with job description) |
| **🎨 Frontend** | Vue.js, React, or Angular (align with job description) |
| **🏗️ Architecture** | Monorepo structure with shared types |
| **🚀 Installation** | Simple install and start commands |
| **✍️ Authenticity** | All code must be your own work |
| **🖥️ Live Demo** | Functional project running locally for interview |

Other requirements: - 

### 📦 Deliverables

- Monorepo structure
- Complete source code in a Git repository
- README with setup instructions
- Frontend chat interface
- Backend API endpoint

### 🏆 Evaluation Criteria

| Criteria | Description |
|----------|-------------|
| **Functionality** | Successfully implements basic chat features |
| **Code Quality** | Clean, maintainable code following best practices |
| **Technical Proficiency** | Effective use of chosen framework |
| **Error Handling** | Basic error management for API calls |
| **Documentation** | Clear README with setup instructions |

## 🚀 Challenge Details

### 💬 User Story 1: Message Processing

- Backend endpoint to receive messages
- Keyword detection system with predefined responses
- At least 3 different keyword-response pairs
- Return appropriate response based on detected keywords

### 📦 User Story 2: Chat Interface

- Display message history in a chat window
- Input field for user messages
- Send button to submit messages
- Basic styling for chat bubbles

### Example Keyword-Response Pairs:

```javascript
[
  { keywords: ['price', 'cost', 'pricing'], response: 'Our pricing starts at $9.99/month' },
  { keywords: ['hello', 'hi', 'hey'], response: 'Hello! How can I assist you today?' },
  { keywords: ['help', 'support'], response: 'I\'m here to help. What can I do for you?' },
  { keywords: ['features', 'services'], response: 'We offer various features including cloud storage, real-time sync, and 24/7 support' }
]
```

## 🌟 Bonus Features (Optional)

- Loading states while waiting for response
- Error message display
- Basic message validation
- Database integration for:
  - Message history persistence
  - Dynamic keyword-response management

## 💡 Tips

| Area | Details |
|------|---------|
| **Development** | • Start with backend keyword detection<br>• Consider proper state management patterns<br>• Use fetch or axios for API calls |
| **Code Organization** | • Separate components logically<br>• Keep business logic in backend<br>• Use consistent naming conventions |
| **Framework Choice** | • Choose the framework specified in the job description<br>• Demonstrate proficiency in the required framework<br>• Follow framework's best practices and conventions |
| **Interview Preparation** | • Be ready to explain your approach, decision-making, and any challenges faced during implementation |

---

*Build something simple but functional!* 🚀