'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { UserIcon, LockIcon, MailIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [formHeight, setFormHeight] = useState(0)
    const formRef = useRef(null)

    const onSubmit = (data) => {
        console.log(data)
        // Handle form submission here
    }

    useEffect(() => {
        const updateHeight = () => {
            if (formRef.current) {
                setFormHeight(formRef.current.offsetHeight)
            }
        }

        updateHeight()
        window.addEventListener('resize', updateHeight)
        return () => window.removeEventListener('resize', updateHeight)
    }, [isLogin])

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    }

    const [[page, direction], setPage] = useState([0, 0])

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection])
        setIsLogin(!isLogin)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLogin ? 'Welcome Back!' : 'Create an Account'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLogin ? 'Log in to your account' : 'Sign up for a new account'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div style={{ height: formHeight, transition: 'height 0.3s ease-in-out', overflow: 'hidden' }}>
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                            >
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" ref={formRef}>
                                    {!isLogin && (
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="pl-10"
                                                    {...register('name', { required: !isLogin })}
                                                />
                                            </div>
                                            {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                                        </div>
                                    )}
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="pl-10"
                                                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                            />
                                        </div>
                                        {errors.email && <span className="text-sm text-red-500">Please enter a valid email</span>}
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative">
                                            <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10"
                                                {...register('password', { required: true, minLength: 8 })}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-gray-400"
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <span className="text-sm text-red-500">
                                                Password must be at least 8 characters long
                                            </span>
                                        )}
                                    </div>
                                    <Button type="submit" className="w-full">
                                        {isLogin ? 'Log In' : 'Sign Up'}
                                    </Button>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center w-full">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <Button
                            variant="link"
                            className="pl-1 underline"
                            onClick={() => paginate(isLogin ? 1 : -1)}
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </Button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}