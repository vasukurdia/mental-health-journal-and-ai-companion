// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true, message: '' };
};

// Name validation
export const validateName = (name) => {
  if (name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  if (name.trim().length > 50) {
    return { valid: false, message: 'Name must be less than 50 characters' };
  }
  return { valid: true, message: '' };
};

// Journal title validation
export const validateJournalTitle = (title) => {
  if (title.trim().length === 0) {
    return { valid: false, message: 'Title is required' };
  }
  if (title.length > 100) {
    return { valid: false, message: 'Title must be less than 100 characters' };
  }
  return { valid: true, message: '' };
};

// Journal content validation
export const validateJournalContent = (content) => {
  if (content.trim().length === 0) {
    return { valid: false, message: 'Content is required' };
  }
  if (content.length > 5000) {
    return { valid: false, message: 'Content must be less than 5000 characters' };
  }
  return { valid: true, message: '' };
};

// Form validation helper
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    
    if (rule.required && !value) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }
    
    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} must be less than ${rule.maxLength} characters`;
    }
    
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} is invalid`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};