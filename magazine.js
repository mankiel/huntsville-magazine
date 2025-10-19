// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Modal Functions
function openContactModal() {
    document.getElementById('contact-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                message: document.getElementById('contact-message').value,
                timestamp: new Date().toISOString()
            };
            
            // Store in localStorage for demo purposes
            let contacts = JSON.parse(localStorage.getItem('demo-contacts') || '[]');
            contacts.push(formData);
            localStorage.setItem('demo-contacts', JSON.stringify(contacts));
            
            // Show success message
            contactForm.style.display = 'none';
            document.getElementById('contact-success').style.display = 'block';
            
            // Log for demo purposes
            console.log('📧 Story Submission Received:', formData);
            console.log('💡 In production, this would send to your editorial team');
            
            // Reset after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                document.getElementById('contact-success').style.display = 'none';
                closeContactModal();
            }, 3000);
        });
    }
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const contactModal = document.getElementById('contact-modal');
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Gallery Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.querySelector('.close-lightbox');
let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems);

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImage.src = img.src;
        currentImageIndex = index;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Lightbox Navigation
const prevImageBtn = document.getElementById('prev-image');
const nextImageBtn = document.getElementById('next-image');

if (prevImageBtn) {
    prevImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const img = galleryImages[currentImageIndex].querySelector('img');
        lightboxImage.src = img.src;
    });
}

if (nextImageBtn) {
    nextImageBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        const img = galleryImages[currentImageIndex].querySelector('img');
        lightboxImage.src = img.src;
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft' && prevImageBtn) {
            prevImageBtn.click();
        } else if (e.key === 'ArrowRight' && nextImageBtn) {
            nextImageBtn.click();
        }
    }
});

// Subscription Plans
const planButtons = document.querySelectorAll('.plan-card .btn');

planButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const planName = this.closest('.plan-card').querySelector('h3').textContent;
        const planPrice = this.closest('.plan-card').querySelector('.amount').textContent;
        
        alert(`You selected the ${planName} plan!\nPrice: ${planPrice}\n\nIn a real application, this would redirect to a payment page.`);
    });
});

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

let cartModal, cartButton, closeCartModal, cartItems, cartTotal, cartCount;

// Initialize cart elements after DOM is loaded
function initializeCart() {
    console.log('=== Cart Initialization Started ===');
    
    cartModal = document.getElementById('cart-modal');
    cartButton = document.querySelector('.floating-cart');
    closeCartModal = cartModal?.querySelector('.close-modal');
    cartItems = document.getElementById('cart-items');
    cartTotal = document.getElementById('cart-total');
    cartCount = document.getElementById('cart-count');
    
    console.log('Cart elements found:', {
        cartModal: !!cartModal,
        cartButton: !!cartButton,
        cartItems: !!cartItems,
        cartTotal: !!cartTotal,
        cartCount: !!cartCount
    });
    
    // Update cart display on page load
    updateCart();
    
    // Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log('Found Add to Cart buttons:', addToCartButtons.length);
    
    addToCartButtons.forEach((button, index) => {
        console.log(`Adding listener to button ${index + 1}`);
        button.addEventListener('click', function() {
            console.log('>>> Add to Cart button clicked!');
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;
            
            console.log('Product details:', { productName, productPrice });
            
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity++;
                console.log('Increased quantity for:', productName);
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
                console.log('Added new item:', productName);
            }
            
            console.log('Current cart:', cart);
            updateCart();
            saveCart();
            
            // Visual feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.background = '#27ae60';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
                this.disabled = false;
            }, 1000);
        });
    });
    
    // Cart modal controls
    if (cartButton) {
        cartButton.addEventListener('click', openCart);
    }
    
    if (closeCartModal) {
        closeCartModal.addEventListener('click', () => {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCart);
} else {
    initializeCart();
}

// Update Cart Display
function updateCart() {
    // Ensure elements are initialized
    if (!cartItems || !cartTotal || !cartCount) {
        console.warn('Cart elements not yet initialized');
        return;
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #7f8c8d;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        cartCount.textContent = '0';
        return;
    }
    
    let total = 0;
    let totalItems = 0;
    
    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
        
        return `
            <div class="cart-item">
                <div style="display: flex; gap: 15px; align-items: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div>
                        <h5 style="margin: 0; font-size: 1rem;">${item.name}</h5>
                        <p style="margin: 5px 0; color: #7f8c8d;">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="changeQuantity('${item.name}', -1)" style="padding: 5px 10px; border: none; background: #e74c3c; color: white; border-radius: 5px; cursor: pointer;">-</button>
                    <span style="font-weight: bold;">${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)" style="padding: 5px 10px; border: none; background: #27ae60; color: white; border-radius: 5px; cursor: pointer;">+</button>
                    <button onclick="removeFromCart('${item.name}')" style="padding: 5px 10px; border: none; background: #e74c3c; color: white; border-radius: 5px; cursor: pointer; margin-left: 10px;"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = totalItems;
    
    console.log(`Cart updated: ${totalItems} items, $${total.toFixed(2)}`);
    
    // Animate cart badge when updated
    if (cartCount) {
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}

// Change Quantity
function changeQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCart();
            saveCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
    saveCart();
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Open Cart Modal
function openCart() {
    if (cartModal) {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Cart modal click outside to close
if (cartModal) {
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Checkout button
const checkoutBtn = document.querySelector('[onclick="checkout()"]');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert(`Checkout Complete!\nTotal: $${cartTotal.textContent}\n\nThank you for your purchase!\n\nIn a real application, this would redirect to a payment gateway.`);
    cart = [];
    updateCart();
    saveCart();
    if (cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Donation Form
const donationAmounts = document.querySelectorAll('.amount-btn');
const customAmount = document.getElementById('custom-amount');

donationAmounts.forEach(button => {
    button.addEventListener('click', function() {
        donationAmounts.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        customAmount.value = this.getAttribute('data-amount');
    });
});

customAmount.addEventListener('input', function() {
    donationAmounts.forEach(btn => btn.classList.remove('active'));
});

document.getElementById('donation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = customAmount.value;
    const name = document.getElementById('donor-name').value;
    const email = document.getElementById('donor-email').value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid donation amount');
        return;
    }
    
    alert(`Thank you for your donation, ${name}!\n\nAmount: $${amount}\n\nA confirmation email will be sent to: ${email}\n\nYour generosity makes a difference!`);
    
    this.reset();
    donationAmounts.forEach(btn => btn.classList.remove('active'));
});

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input').value;
    
    alert(`Thank you for subscribing!\n\nWelcome email sent to: ${email}`);
    
    this.reset();
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe article cards
document.querySelectorAll('.article-card, .product-card, .plan-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

// Quick View for Products (placeholder)
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h4').textContent;
        
        alert(`Quick View: ${productName}\n\nIn a real application, this would show a detailed product modal.`);
    });
});

// Read More Links
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const articleTitle = this.closest('.article-content, .article-body').querySelector('h3, h4').textContent;
        
        alert(`Opening article: "${articleTitle}"\n\nIn a real application, this would navigate to the full article page.`);
    });
});

// Scroll to Top Button (optional enhancement)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 998;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    transition: all 0.3s;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

console.log('✨ Magazine website loaded successfully!');
console.log('📦 Cart items:', cart.length);
