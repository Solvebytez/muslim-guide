import { Request, Response } from 'express';
import Support from '../models/support.model';
import { asyncHandler } from '../middleware/asyncHandler';
import { apiSuccessResponse } from '../utils/response';
import { sendMail } from '../utils/sendMail';
import User from '../models/user.model';
import { ValidationError } from '../config/error.config';


export const createSupportTicket = asyncHandler(async (req: Request, res: Response) => {
  const { subject, description } = req.body;
    const userId = (req as any).user?._id; // Assuming you have authentication middleware

    console.log(subject, description)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!subject || !description) {
      return res.status(400).json({
        success: false,
        message: 'Subject and description are required',
      });
    }

     // First get user details
     const user = await User.findById(userId);
     if (!user) {
       throw new ValidationError('User not found', 404)
     }

    const supportTicket = await Support.create({
      subject,
      description,
      user: userId
    });

    await sendMail(
      "muslimguide7@gmail.com",
      'Support Ticket Created',
      'support-ticket-created',
      {
        name: user.name,
        userEmail: user.email,
        ticketId: supportTicket._id,
        ticketSubject: supportTicket.subject,
        ticketDescription: supportTicket.description,
        createdAt: supportTicket.createdAt
      }
    );

    apiSuccessResponse(res, "Ticket created successfully", 201, supportTicket);

})

export const getUserSupportTickets = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id; // From authentication middleware
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const tickets = await Support.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getAllSupportTickets = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id; // From authentication middleware
    
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  const user = await User.findById(userId);
  if (!user || user.role !== 'admin') {
    throw new ValidationError('Unauthorized', 401) // 401 Unauthorized
  }

  const tickets = await Support.find({})
  .sort({ createdAt: -1 })
  .populate({
    path: 'user',
    populate: {
      path: 'avatar', // field in User model that references Image model
    },
  });
  
  apiSuccessResponse(res, "Tickets fetched successfully", 200, tickets);
  
})